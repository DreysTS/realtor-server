import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { PropertyStatus } from 'prisma/__generated__'
import { PrismaService } from 'src/prisma/prisma.service'

import { CreateProperty } from './dto/create-property.dto'
import { PropertyFiltersDto } from './dto/property-filters.dto'
import { UpdatePropertyDto } from './dto/update-property.dto'

@Injectable()
export class PropertyService {
	public constructor(private readonly prismaService: PrismaService) {}

	public async findAll(filters: PropertyFiltersDto, signal?: AbortSignal) {
		const where: any = {
			status: PropertyStatus.ACTIVE
		}

		if (filters.rooms !== undefined) {
			where.rooms = filters.rooms
		}

		if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
			where.price = {}

			if (filters.minPrice !== undefined) {
				where.price.gte = filters.minPrice
			}

			if (filters.maxPrice !== undefined) {
				where.price.lte = filters.maxPrice
			}
		}

		if (
			filters.minSquare !== undefined ||
			filters.maxSquare !== undefined
		) {
			where.square = {}

			if (filters.minSquare !== undefined) {
				where.square.gte = filters.minSquare
			}

			if (filters.maxSquare !== undefined) {
				where.square.lte = filters.maxSquare
			}
		}

		return await this.prismaService.property.findMany({
			where,
			include: {
				location: true
			},
			orderBy: {
				createdAt: 'desc'
			}
		})
	}

	public async realtorFindAll() {
		return await this.prismaService.property.findMany({
			include: {
				location: true
			},
			orderBy: {
				createdAt: 'desc'
			}
		})
	}

	public async realtorFindById(propertyId: string) {
		return await this.prismaService.property.findFirst({
			where: {
				id: propertyId
			},
			include: {
				location: true
			}
		})
	}

	public async findById(id: string) {
		const property = await this.prismaService.property.findUnique({
			where: {
				id
			},
			include: {
				location: true
			}
		})

		if (!property) {
			throw new NotFoundException(
				'Ничего не найдено. Пожалуйста, перепроверьте данные и попробуйте ещё раз.'
			)
		}

		return property
	}

	public async delete(id: string) {
		return await this.prismaService.property.delete({
			where: {
				id
			},
			include: {
				location: true
			}
		})
	}

	public async create(dto: CreateProperty) {
		return await this.prismaService.property.create({
			data: {
				title: dto.title,
				description: dto.description,
				images: dto.images,
				price: dto.price,
				square: dto.square,
				rooms: dto.rooms,
				kitchenSquare: dto.kitchenSquare,
				roomsSquare: dto.roomsSquare,
				floor: dto.floor,
				totalFloors: dto.totalFloors,
				isSecondary: dto.isSecondary,
				builtYear: dto.builtYear,
				ceilingHeight: dto.ceilingHeight,
				buildingType: dto.buildingType,
				propertyType: dto.propertyType,
				sellingType: dto.sellingType,
				location: {
					create: {
						address: dto.address,
						city: dto.city,
						district: dto.district,
						latitude: dto.latitude,
						longitude: dto.longitude
					}
				}
			},
			include: {
				location: true
			}
		})
	}

	public async update(id: string, dto: UpdatePropertyDto) {
		return await this.prismaService.property.update({
			where: {
				id
			},
			data: {
				title: dto.title,
				description: dto.description,
				images: dto.images,
				price: dto.price,
				square: dto.square,
				rooms: dto.rooms,
				kitchenSquare: dto.kitchenSquare,
				roomsSquare: dto.roomsSquare,
				floor: dto.floor,
				totalFloors: dto.totalFloors,
				isSecondary: dto.isSecondary,
				builtYear: dto.builtYear,
				ceilingHeight: dto.ceilingHeight,
				buildingType: dto.buildingType,
				propertyType: dto.propertyType,
				sellingType: dto.sellingType,
				location: {
					create: {
						address: dto.address,
						city: dto.city,
						district: dto.district,
						latitude: dto.latitude,
						longitude: dto.longitude
					}
				}
			},
			include: {
				location: true
			}
		})
	}

	public async setStatus(id: string, status: string) {
		const normalizedStatus = status.toUpperCase() as PropertyStatus

		if (!Object.values(PropertyStatus).includes(normalizedStatus)) {
			throw new BadRequestException('Некорректный статус.')
		}

		return await this.prismaService.property.update({
			where: {
				id
			},
			data: {
				status: normalizedStatus
			}
		})
	}
}
