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

	public async findAll(filters: PropertyFiltersDto) {
		const where = this.generateWhere(filters)

		const page = filters.page ? parseInt(filters.page.toString()) : 1
		const limit = 10
		const skip = (page - 1) * limit

		const orderBy: Record<string, string> = {}
		if (
			filters.sortBy &&
			Array.isArray(filters.sortBy) &&
			filters.sortBy.length === 2
		) {
			const [field, direction] = filters.sortBy
			orderBy[field] = direction
		} else {
			orderBy.createdAt = 'desc'
		}

		const [properties, totalCount] = await Promise.all([
			this.prismaService.property.findMany({
				where,
				include: { location: true },
				orderBy,
				skip,
				take: limit
			}),
			this.prismaService.property.count({ where })
		])

		return {
			data: properties,
			pagination: {
				total: totalCount,
				page,
				limit,
				hasMore: page * limit < totalCount
			}
		}
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

	private generateWhere(filters: PropertyFiltersDto) {
		const where: any = {
			status: PropertyStatus.ACTIVE
		}

		if (filters.rooms?.length) {
			where.rooms = {
				in: filters.rooms
			}
		}

		if (filters.buildingType?.length) {
			where.buildingType = {
				in: filters.buildingType
			}
		}

		if (filters.propertyType?.length) {
			where.propertyType = {
				in: filters.propertyType
			}
		}

		if (filters.isSecondary !== undefined) {
			where.isSecondary = filters.isSecondary
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

		return where
	}
}
