import { Injectable, NotFoundException } from '@nestjs/common'
import { PropertyStatus } from 'prisma/__generated__'
import { FileService } from 'src/file/file.service'
import { PrismaService } from 'src/prisma/prisma.service'

import { CreateProperty } from './dto/create-property.dto'
import { UpdateProperty } from './dto/update-property.dto'

@Injectable()
export class PropertyService {
	public constructor(
		private readonly prismaService: PrismaService,
		private readonly fileService: FileService
	) {}

	public async findAll() {
		return await this.prismaService.property.findMany({
			where: {
				status: PropertyStatus.ACTIVE
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

	public async create(files: Express.Multer.File[], dto: CreateProperty) {
		const images = await this.fileService.saveImages(files)

		return await this.prismaService.property.create({
			data: {
				title: dto.title,
				description: dto.description,
				images,
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

	public async update(
		id: string,
		files: Express.Multer.File[],
		dto: UpdateProperty
	) {
		const property = await this.prismaService.property.findFirst({
			select: {
				images: true
			},
			where: {
				id
			}
		})

		const existingImages = property.images

		const images = await this.fileService.processPropertyImages(
			existingImages,
			files
		)

		await this.prismaService.property.create({
			data: {
				title: dto.title,
				description: dto.description,
				images,
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
}
