import { Injectable, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
	PropertyRequestStatus,
	PropertyStatus,
	PropertyType
} from 'prisma/__generated__'
import { PrismaService } from 'src/prisma/prisma.service'

import { DeclinePropertyRequestDto } from './dto/decline-property-request.dto'

@Injectable()
export class PropertyRequestService {
	public constructor(
		private readonly prismaService: PrismaService,
		private readonly configService: ConfigService
	) {}

	public async acceptPropertyRequest(id: string) {
		const propertyRequest = await this.findPropertyRequestById(id)

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
				currentUrl: `${this.configService.getOrThrow<string>('ALLOWED_ORIGIN')}/profile/requests/${property.id}`
			}
		})
	}

	public async declinePropertyRequest(
		id: string,
		dto: DeclinePropertyRequestDto
	) {
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

	private async findPropertyRequestById(id: string) {
		const propertyRequest =
			await this.prismaService.propertyRequest.findFirst({
				where: {
					id
				}
			})

		return propertyRequest
	}
}
