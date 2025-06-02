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

	private async processNewFiles(files: Express.Multer.File[]) {
		const response = []
		for (const file of files) {
			const fileName = `${uuidv4()}.webp`
			const filePath = path.join(this.uploadDir, fileName)

			await sharp(file.buffer).webp({ quality: 80 }).toFile(filePath)

			response.push({ url: fileName })
		}
		return response
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
