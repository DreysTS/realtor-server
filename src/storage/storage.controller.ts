import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	ParseFilePipe,
	Post,
	Res,
	UploadedFiles,
	UseInterceptors
} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { Response } from 'express'
import { IMAGE_VALIDATORS } from 'src/libs/common/constants/image-validators'

import { StorageService } from './storage.service'

@Controller('storage')
export class StorageController {
	constructor(private readonly storageService: StorageService) {}

	@UseInterceptors(FilesInterceptor('files'))
	@Post()
	@HttpCode(HttpStatus.OK)
	public async upload(
		@UploadedFiles(
			new ParseFilePipe({
				validators: IMAGE_VALIDATORS
			})
		)
		files: Express.Multer.File[]
	) {
		return await this.storageService.upload(files)
	}

	@Get('download')
	@HttpCode(HttpStatus.OK)
	public async download(@Body('id') id: string, @Res() res: Response) {
		return this.storageService.download(id, res)
	}

	@Delete('delete')
	@HttpCode(HttpStatus.OK)
	public async delete(@Body('id') id: string) {
		return this.storageService.delete(id)
	}


}
