/* eslint-disable prettier/prettier */
import {
	ConflictException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

import { CreateDeveloperDto } from './dto/create-developer.dto'
import { CreateRealEstateDto } from './dto/create-real-estate.dto'

@Injectable()
export class RealEstateService {
	public constructor(private readonly prismaService: PrismaService) {}

	public async create(dto: CreateRealEstateDto) {
		if (dto.developerId) {
			const developer = await this.prismaService.developer.findUnique({
				where: {
					id: dto.developerId
				}
			})
			if (!developer) {
				throw new NotFoundException(
					'Застройщик не найден. Пожалуйста, проверьте введённые данные.'
				)
			}
		}

		return this.prismaService.realEstate.create({
			data: {
				...dto,
				images: {
					createMany: {
						data: dto.images.map(img => ({
							url: img.url,
							order: img.order || 0,
							isMain: img.isMain || false,
							description: img.description
						}))
					}
				}
			},
			include: {
				images: true,
				developer: !!dto.developerId
			}
		})
	}

	public async getAllRealEstates() {
		return this.prismaService.realEstate.findMany({
			include: {
				images: true,
				developer: true
			}
		})
	}

	public async getRealEstateById(id: string) {
		const realEstate = await this.prismaService.realEstate.findUnique({
			where: {
				id
			},
			include: {
				images: true,
				developer: true
			}
		})

		if (!realEstate) {
			throw new NotFoundException(
				'Информация о недвижимости не найдена. Пожалуйста, проверьте правильность введённых данных.'
			)
		}

		return realEstate
	}

	public async update(id: string, dto: CreateRealEstateDto) {
		const isRealEstateExist =
			await this.prismaService.realEstate.findUnique({
				where: {
					id
				}
			})
		if (!isRealEstateExist) {
			throw new NotFoundException(
				'Данной недвижиости не существует. Добавьте данные записи на странице создания.'
			)
		}
	}

	public async delete(id: string) {
		return this.prismaService.realEstate.delete({
			where: {
				id
			}
		})
	}

	public async createDeveloper(dto: CreateDeveloperDto) {
		const developer = this.prismaService.developer.findUnique({
			where: {
				name: dto.name
			}
		})

		if (developer) {
			throw new ConflictException(
				'Данный застройщик уже сущестует. Проверьте правильность введённых данных.'
			)
		}

		return this.prismaService.developer.create({
			data: {
				...dto
			}
		})
	}

	public async deleteDeveloper(id: string) {
		return this.prismaService.developer.delete({
			where: {
				id
			}
		})
	}
}
