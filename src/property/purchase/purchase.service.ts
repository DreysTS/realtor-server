import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { PropertyPurchaseStatus } from 'prisma/__generated__'
import { PrismaService } from 'src/prisma/prisma.service'
import { UserService } from 'src/user/user.service'

import { CreatePurchaseDto } from './dto/create-purchase.dto'
import { UpdatePurchaseDto } from './dto/update-purchase.dto'

@Injectable()
export class PurchaseService {
	public constructor(
		private readonly userService: UserService,
		private readonly prismaService: PrismaService
	) {}

	public async findPurchase(purchaseId: string) {
		const purchase = await this.prismaService.propertyPurchase.findFirst({
			where: {
				id: purchaseId
			},
			include: {
				user: {
					select: {
						displayName: true,
						picture: true,
						phoneNumber: true
					}
				}
			}
		})

		if (!purchase) {
			throw new NotFoundException(
				'Заявка на покупку не найдена. Пожалуйста, проверьте введённые данные.'
			)
		}

		return purchase
	}

	public async findPurchases(userId: string) {
		return await this.prismaService.propertyPurchase.findMany({
			where: {
				userId
			},
			include: {
				user: {
					select: {
						phoneNumber: true
					}
				}
			}
		})
	}

	public async findUsersPurchases() {
		return await this.prismaService.propertyPurchase.findMany({
			include: {
				user: true
			}
		})
	}

	public async findUserPurchases(targetUserId: string) {
		return await this.prismaService.propertyPurchase.findMany({
			where: {
				userId: targetUserId
			},
			include: {
				user: true
			}
		})
	}

	public async addPurchase(userId: string, dto: CreatePurchaseDto) {
		const userProfile = await this.userService.findById(userId)

		if (!userProfile.phoneNumber) {
			await this.prismaService.user.update({
				where: {
					id: userId
				},
				data: {
					phoneNumber: dto.phone_number
				}
			})
		}

		return await this.prismaService.propertyPurchase.create({
			data: {
				description: dto.description,
				budget_min: dto.budget_min,
				budget_max: dto.budget_max,
				rooms: dto.rooms,
				area_min: dto.area_min,
				area_max: dto.area_max,
				contact_method: dto.contact_method,
				status: PropertyPurchaseStatus.PENDING,
				userId
			}
		})
	}

	public async updatePurchase(
		userId: string,
		purchaseId: string,
		dto: UpdatePurchaseDto
	) {
		await this.prismaService.user.update({
			where: {
				id: userId
			},
			data: {
				phoneNumber: dto.phone_number
			}
		})

		return await this.prismaService.propertyPurchase.update({
			where: {
				id: purchaseId
			},
			data: {
				description: dto.description,
				budget_min: dto.budget_min,
				budget_max: dto.budget_max,
				rooms: dto.rooms,
				area_min: dto.area_min,
				area_max: dto.area_max,
				contact_method: dto.contact_method,
				status: PropertyPurchaseStatus.PENDING,
				userId
			}
		})
	}

	public async deletePurchase(purchaseId: string) {
		return await this.prismaService.propertyPurchase.delete({
			where: { id: purchaseId }
		})
	}

	public async updateStatus(id: string, status: string) {
		const normalizedStatus = status.toUpperCase() as PropertyPurchaseStatus

		if (!Object.values(PropertyPurchaseStatus).includes(normalizedStatus)) {
			throw new BadRequestException('Некорректный статус.')
		}

		return await this.prismaService.propertyPurchase.update({
			where: {
				id
			},
			data: {
				status: normalizedStatus
			}
		})
	}
}
