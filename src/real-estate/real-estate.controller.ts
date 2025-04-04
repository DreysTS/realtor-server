import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post
} from '@nestjs/common'
import { UserRole } from 'prisma/__generated__'
import { Authorization } from 'src/auth/decorators/auth.decorator'

import { CreateDeveloperDto } from './dto/create-developer.dto'
import { CreateRealEstateDto } from './dto/create-real-estate.dto'
import { RealEstateService } from './real-estate.service'

@Controller('real-estate')
export class RealEstateController {
	constructor(private readonly realEstateService: RealEstateService) {}

	@Authorization(UserRole.ADMIN)
	@HttpCode(HttpStatus.OK)
	@Post('create')
	public async create(@Body() dto: CreateRealEstateDto) {
		return this.realEstateService.create(dto)
	}

	@HttpCode(HttpStatus.OK)
	@Get('catalog')
	public async getAllRealEstates() {
		return this.realEstateService.getAllRealEstates()
	}

	@HttpCode(HttpStatus.OK)
	@Get('catalog/:id')
	public async getRealEstateById(@Param('id') id: string) {
		return this.realEstateService.getRealEstateById(id)
	}

	@Authorization(UserRole.ADMIN)
	@HttpCode(HttpStatus.OK)
	@Post('create-developer')
	public async createDeveloper(@Body() dto: CreateDeveloperDto) {
		return this.realEstateService.createDeveloper(dto)
	}
}
