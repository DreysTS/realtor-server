import { Injectable } from '@nestjs/common'
import * as fs from 'fs'
import * as path from 'path'
import * as sharp from 'sharp'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class FileService {
	private readonly uploadDir = path.join(__dirname, '..', '..', 'uploads')

	public async saveImages(files: Express.Multer.File[]) {
		if (!fs.existsSync(this.uploadDir)) {
			fs.mkdirSync(this.uploadDir, { recursive: true })
		}

		return await this.processNewFiles(files)
	}

	public async processPropertyImages(
		existingFiles: string[],
		newFiles: Express.Multer.File[]
	) {
		if (!fs.existsSync(this.uploadDir)) {
			fs.mkdirSync(this.uploadDir, { recursive: true })
		}

		const filesToDelete = existingFiles.filter(
			url => !newFiles.some(file => file.originalname === url)
		)

		this.deleteFiles(filesToDelete)

		const newImages = await this.processNewFiles(
			newFiles.filter(file => !existingFiles.includes(file.originalname))
		)

		const keptImages = existingFiles.filter(url =>
			newFiles.some(file => file.originalname === url)
		)

		return [...keptImages, ...newImages]
	}

	private async processNewFiles(files: Express.Multer.File[]) {
		const processedImages = []

		for (const file of files) {
			const fileName = `${uuidv4()}.webp`
			const filePath = path.join(this.uploadDir, fileName)

			await sharp(file.buffer).webp({ quality: 80 }).toFile(filePath)

			processedImages.push(fileName)
		}

		return processedImages
	}

	private deleteFiles(fileNames: string[]) {
		fileNames.forEach(fileName => {
			const filePath = path.join(this.uploadDir, fileName)
			if (fs.existsSync(filePath)) {
				fs.unlinkSync(filePath)
			}
		})
	}
}
