import { Injectable, NotFoundException } from '@nestjs/common'
import {
	PropertyRequestStatus,
	PropertyStatus,
	PropertyType
} from 'prisma/__generated__'
import { PrismaService } from 'src/prisma/prisma.service'

import { CreateRequest } from './dto/create-request.dto'
import { DeclineRequestDto } from './dto/decline-request.dto'

@Injectable()
export class RequestService {
	public constructor(private readonly prismaService: PrismaService) {}

	public async findRequests(userId: string) {
		return await this.prismaService.propertyRequest.findMany({
			where: {
				userId
			},
			orderBy: {
				createdAt: 'asc'
			}
		})
	}

	public async findUserRequests(targetUserId: string) {
		return await this.prismaService.propertyRequest.findMany({
			where: {
				userId: targetUserId
			},
			orderBy: {
				createdAt: 'asc'
			}
		})
	}

	public async findUsersRequests() {
		return await this.prismaService.propertyRequest.findMany({
			orderBy: {
				createdAt: 'desc'
			},
			include: {
				user: true
			}
		})
	}

	public async createRequest(userId: string, dto: CreateRequest) {
		return await this.prismaService.propertyRequest.create({
			data: {
				title: dto.title,
				description: dto.description,
				price: dto.price,
				square: dto.square,
				rooms: dto.rooms,
				address: dto.address,
				images: dto.images,
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
				userId: propertyRequest.userId,
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
				propertyId: property.id
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

	public async findRequestById(id: string) {
		const propertyRequest =
			await this.prismaService.propertyRequest.findFirst({
				where: {
					id
				},
				include: {
					user: true
				}
			})

		return propertyRequest
	}
}
