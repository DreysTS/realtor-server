import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	ParseFilePipe,
	Post,
	UploadedFiles,
	UseInterceptors
} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { IMAGE_VALIDATORS } from 'src/libs/common/constants/image-validators'

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
				validators: IMAGE_VALIDATORS
			})
		)
		files: Express.Multer.File[],
		@Body() dto: CreateProperty
	) {
		return this.propertyService.create(files, dto)
	}

	@UseInterceptors(FilesInterceptor('files'))
	@Post(':id')
	public async update(
		@UploadedFiles(
			new ParseFilePipe({
				validators: IMAGE_VALIDATORS
			})
		)
		@Param('id')
		id: string,
		files: Express.Multer.File[],
		@Body() dto: CreateProperty
	) {
		return this.propertyService.update(id, files, dto)
	}

	@Delete(':id')
	@HttpCode(HttpStatus.OK)
	public async delete(@Param('id') id: string) {
		return this.propertyService.delete(id)
	}
}
