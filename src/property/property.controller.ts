import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Patch,
	Post,
	Query
} from '@nestjs/common'
import { UserRole } from 'prisma/__generated__'
import { Authorization } from 'src/auth/decorators/auth.decorator'

import { CreateProperty } from './dto/create-property.dto'
import { PropertyFiltersDto } from './dto/property-filters.dto'
import { UpdatePropertyDto } from './dto/update-property.dto'
import { PropertyService } from './property.service'

@Controller('property')
export class PropertyController {
	constructor(private readonly propertyService: PropertyService) {}

	@Get()
	@HttpCode(HttpStatus.OK)
	public async findAll(
		@Query() filters: PropertyFiltersDto,
		signal?: AbortSignal
	) {
		return this.propertyService.findAll(filters)
	}

	@Authorization(UserRole.REALTOR)
	@Get('realtor')
	@HttpCode(HttpStatus.OK)
	public async realtorFindAll() {
		return this.propertyService.realtorFindAll()
	}

	@Authorization(UserRole.REALTOR)
	@Get('realtor/:propertyId')
	@HttpCode(HttpStatus.OK)
	public async realtorFindById(@Param('propertyId') propertyId: string) {
		return this.propertyService.realtorFindById(propertyId)
	}

	@Get(':id')
	@HttpCode(HttpStatus.OK)
	public async findById(@Param('id') id: string) {
		return this.propertyService.findById(id)
	}

	@Authorization(UserRole.REALTOR)
	@Post()
	public async create(@Body() dto: CreateProperty) {
		console.log(dto)
		return this.propertyService.create(dto)
	}

	@Authorization(UserRole.REALTOR)
	@Patch(':id')
	public async update(
		@Param('id') id: string,
		@Body() dto: UpdatePropertyDto
	) {
		return this.propertyService.update(id, dto)
	}

	@Delete(':id')
	@HttpCode(HttpStatus.OK)
	public async delete(@Param('id') id: string) {
		return this.propertyService.delete(id)
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
