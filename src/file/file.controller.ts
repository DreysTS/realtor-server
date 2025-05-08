import {
	Controller,
	ParseFilePipe,
	Post,
	UploadedFiles,
	UseInterceptors
} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { UserRole } from 'prisma/__generated__'
import { Authorization } from 'src/auth/decorators/auth.decorator'
import { IMAGE_VALIDATORS } from 'src/libs/common/constants/image-validators'

import { FileService } from './file.service'

@Controller('file')
export class FileController {
	constructor(private readonly fileService: FileService) {}

	@Authorization(UserRole.REALTOR)
	@UseInterceptors(FilesInterceptor('files'))
	@Post()
	public async create(
		@UploadedFiles(
			new ParseFilePipe({
				validators: IMAGE_VALIDATORS
			})
		)
		files: Express.Multer.File[]
	) {
		return
	}
}
