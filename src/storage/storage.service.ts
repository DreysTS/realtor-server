import {
	DeleteObjectCommand,
	GetObjectCommand,
	PutObjectCommand,
	S3Client
} from '@aws-sdk/client-s3'
import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Response } from 'express'
import pLimit from 'p-limit'
import * as sharp from 'sharp'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class StorageService {
	private readonly client: S3Client
	private readonly bucket: string

	public constructor(private readonly configService: ConfigService) {
		this.client = new S3Client({
			endpoint: this.configService.getOrThrow<string>('S3_ENDPOINT'),
			credentials: {
				accessKeyId:
					this.configService.getOrThrow<string>('S3_ACCESS_KEY_ID'),
				secretAccessKey: this.configService.getOrThrow<string>(
					'S3_SECRET_ACCESS_KEY'
				)
			},
			region: this.configService.getOrThrow<string>('S3_REGION')
		})

		this.bucket = this.configService.getOrThrow<string>('S3_BUCKET_NAME')
	}

	public async upload(files: Express.Multer.File[]) {
		try {
			const limit = pLimit(5)

			const uploadImages = files.map(file =>
				limit(async () => {
					const fileName = `${uuidv4()}.webp`

					const webpBuffer = await sharp(file.buffer)
						.webp({
							quality: 80
						})
						.toBuffer()

					const command = new PutObjectCommand({
						Bucket: this.bucket,
						Key: fileName,
						Body: webpBuffer,
						ContentType: 'image/webp'
					})

					await this.client.send(command)

					return {
						url: fileName
					}
				})
			)

			return await Promise.all(uploadImages)
		} catch (error) {
			throw new InternalServerErrorException('Не удалось загрузить файлы')
		}
	}

	public async download(key: string, res: Response) {
		const command = new GetObjectCommand({
			Bucket: this.bucket,
			Key: key
		})

		try {
			const object = await this.client.send(command)

			res.setHeader(
				'Content-Type',
				object.ContentType ?? 'application/octet-stream'
			)

			res.setHeader(
				'Content-Length',
				object.ContentLength?.toString() ?? ''
			)

			res.setHeader('Content-Disposition', `attachment; filename=${key}`)

			if (object.Body) {
				;(object.Body as NodeJS.ReadableStream).pipe(res)
			} else {
				throw new InternalServerErrorException('Файл пустой')
			}
		} catch (error) {
			throw new InternalServerErrorException('Не удалось скачать файл')
		}
	}

	public async delete(key: string) {
		const command = new DeleteObjectCommand({
			Bucket: this.bucket,
			Key: key
		})

		try {
			return await this.client.send(command)
		} catch (error) {
			throw new InternalServerErrorException('Не удалось удалить файлы')
		}
	}
}
