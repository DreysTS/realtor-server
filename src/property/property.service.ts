import { Injectable, NotFoundException } from '@nestjs/common'
import * as fs from 'fs'
import * as path from 'path'
import { PropertyStatus } from 'prisma/__generated__'
import * as sharp from 'sharp'
import { PrismaService } from 'src/prisma/prisma.service'
import { v4 as uuidv4 } from 'uuid'

import { CreateProperty } from './dto/create-property.dto'
import { UpdateProperty } from './dto/update-property.dto'

@Injectable()
export class PropertyService {
	public constructor(private readonly prismaService: PrismaService) {}

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
		const uploadDir = path.join(__dirname, '..', '..', 'uploads')

		if (!fs.existsSync(uploadDir)) {
			fs.mkdirSync(uploadDir, { recursive: true })
		}

		const images = []

		for (const file of files) {
			const fileName = `${uuidv4()}.webp`
			const filePath = path.join(uploadDir, fileName)

			await sharp(file.buffer).webp({ quality: 80 }).toFile(filePath)

			images.push(fileName)
		}

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

		// Сделать метод, при котором достаётся массив изображений из
		// папки uploads, массивы фильтруются так, что все изображения
		// что хранились в папке и не пришли из dto, удалялись

		const images = property.images

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
