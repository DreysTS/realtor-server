import { Injectable, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
	PropertyRequestStatus,
	PropertyStatus,
	PropertyType
} from 'prisma/__generated__'
import { FileService } from 'src/file/file.service'
import { PrismaService } from 'src/prisma/prisma.service'

import { CreateSellRequest } from './dto/create-sell-request.dto'
import { DeclineRequestDto } from './dto/decline-request.dto'

@Injectable()
export class RequestService {
	public constructor(
		private readonly prismaService: PrismaService,
		private readonly fileService: FileService,
		private readonly configService: ConfigService
	) {}

	public async createRequest(
		userId: string,
		dto: CreateSellRequest,
		files: Express.Multer.File[]
	) {
		const images = await this.fileService.saveImages(files)

		return await this.prismaService.propertyRequest.create({
			data: {
				title: dto.title,
				description: dto.description,
				price: dto.price,
				square: dto.square,
				rooms: dto.rooms,
				address: dto.address,
				images,
				userId
			}
		})
	}

	public async deleteRequest(userId: string, requestId: string) {
		return await this.prismaService.propertyRequest.delete({
			where: {
				id: requestId,
				userId
			}
		})
	}

	public async acceptRequest(id: string) {
		const propertyRequest = await this.findRequestById(id)

		if (!propertyRequest) {
			throw new NotFoundException(
				'Заявка недвижимости не найдена. Проверьте правильность введённых данных. '
			)
		}

		const property = await this.prismaService.property.create({
			data: {
				title: propertyRequest.title,
				description: propertyRequest.description,
				price: propertyRequest.price,
				square: propertyRequest.square,
				rooms: propertyRequest.rooms,
				images: propertyRequest.images,
				propertyType: PropertyType.FLAT,
				status: PropertyStatus.DRAFT,
				location: {
					create: {
						address: propertyRequest.address
					}
				}
			}
		})

		await this.prismaService.propertyRequest.update({
			where: {
				id
			},
			data: {
				propertyRequestStatus: PropertyRequestStatus.APPROWED,
				currentUrl: `${this.configService.getOrThrow<string>('ALLOWED_ORIGIN')}/profile/requests/${property.id}`
			}
		})
	}

	public async declineRequest(id: string, dto: DeclineRequestDto) {
		return await this.prismaService.propertyRequest.update({
			where: {
				id
			},
			data: {
				propertyRequestStatus: PropertyRequestStatus.REJECTED,
				rejectionReason: dto.rejectionReason
			}
		})
	}

	private async findRequestById(id: string) {
		const propertyRequest =
			await this.prismaService.propertyRequest.findFirst({
				where: {
					id
				}
			})

		return propertyRequest
	}
}
