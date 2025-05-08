import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	ParseFilePipe,
	Patch,
	Post,
	UploadedFiles,
	UseInterceptors
} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { UserRole } from 'prisma/__generated__'
import { Authorization } from 'src/auth/decorators/auth.decorator'
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

	@Get('/realtor')
	@HttpCode(HttpStatus.OK)
	public async realtorFindAll() {
		return this.propertyService.realtorFindAll()
	}

	@Get(':id')
	@HttpCode(HttpStatus.OK)
	public async findById(@Param('id') id: string) {
		return this.propertyService.findById(id)
	}

	@Authorization(UserRole.REALTOR)
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

	@Authorization(UserRole.REALTOR)
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

	@Authorization(UserRole.REALTOR)
	@HttpCode(HttpStatus.OK)
	@Patch(':id/draft')
	public async setDraftStatus(@Param('id') id: string) {
		return this.propertyService.setDraftStatus(id)
	}

	@Authorization(UserRole.REALTOR)
	@HttpCode(HttpStatus.OK)
	@Patch(':id/active')
	public async setActiveStatus(@Param('id') id: string) {
		return this.propertyService.setActiveStatus(id)
	}

	@Authorization(UserRole.REALTOR)
	@HttpCode(HttpStatus.OK)
	@Patch(':id/archive')
	public async setArchiveStatus(@Param('id') id: string) {
		return this.propertyService.setArchiveStatus(id)
	}

	@Authorization(UserRole.REALTOR)
	@HttpCode(HttpStatus.OK)
	@Patch(':id/:status')
	public async setStatus(
		@Param('id') id: string,
		@Param('status') status: string
	) {
		return this.propertyService.setStatus(id, status)
	}
}
