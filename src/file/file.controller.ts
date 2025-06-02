import {
	Controller,
	HttpCode,
	HttpStatus,
	ParseFilePipe,
	Post,
	UploadedFiles,
	UseInterceptors
} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { IMAGE_VALIDATORS } from 'src/libs/common/constants/image-validators'

import { FileService } from './file.service'

@Controller('files')
export class FileController {
	constructor(private readonly fileService: FileService) {}

	@UseInterceptors(FilesInterceptor('files'))
	@Post()
	@HttpCode(HttpStatus.OK)
	public async create(
		@UploadedFiles(
			new ParseFilePipe({
				validators: IMAGE_VALIDATORS
			})
		)
		files: Express.Multer.File[]
	) {
		return this.fileService.saveImages(files)
	}
}
