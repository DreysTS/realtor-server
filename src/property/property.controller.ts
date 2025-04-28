import {
	Controller,
	Delete,
	FileTypeValidator,
	Get,
	HttpCode,
	HttpStatus,
	MaxFileSizeValidator,
	Param,
	ParseFilePipe,
	Post,
	UploadedFiles,
	UseInterceptors
} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { UserRole } from 'prisma/__generated__'
import { Authorization } from 'src/auth/decorators/auth.decorator'
import { Authorized } from 'src/auth/decorators/authorized.decorator'

import { CreateProperty } from './dto/create-property.dto'
import { PropertyService } from './property.service'

@Controller('property')
export class PropertyController {
	constructor(private readonly propertyService: PropertyService) {}

	@Get()
	@HttpCode(HttpStatus.OK)
	public async findAll() {
		return this.propertyService.findAll()
	}

	@Get(':id')
	@HttpCode(HttpStatus.OK)
	public async findById(@Param('id') id: string) {
		return this.propertyService.findById(id)
	}

	@UseInterceptors(FilesInterceptor('files'))
	@Post()
	public async create(
		@UploadedFiles(
			new ParseFilePipe({
				validators: [
					new FileTypeValidator({
						fileType: /\/(jpg|jpeg|png|webp|gif)$/
					}),
					new MaxFileSizeValidator({
						maxSize: 1024 * 1024 * 10,
						message: 'Файл должен быть не более 10Мб'
					})
				]
			})
		)
		files: Express.Multer.File[],
		dto: CreateProperty
	) {
		return this.propertyService.create(files, dto)
	}

	@UseInterceptors(FilesInterceptor('files'))
	@Post(':id')
	public async update(
		@UploadedFiles(
			new ParseFilePipe({
				validators: [
					new FileTypeValidator({
						fileType: /\/(jpg|jpeg|png|webp|gif)$/
					}),
					new MaxFileSizeValidator({
						maxSize: 1024 * 1024 * 10,
						message: 'Файл должен быть не более 10Мб'
					})
				]
			})
		)
		@Param('id')
		id: string,
		files: Express.Multer.File[],
		dto: CreateProperty
	) {
		return this.propertyService.update(id, files, dto)
	}

	@Delete(':id')
	@HttpCode(HttpStatus.OK)
	public async delete(@Param('id') id: string) {
		return this.propertyService.delete(id)
	}
}
