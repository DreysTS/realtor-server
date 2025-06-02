import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Patch,
	Post
} from '@nestjs/common'
import { UserRole } from 'prisma/__generated__'
import { Authorization } from 'src/auth/decorators/auth.decorator'
import { Authorized } from 'src/auth/decorators/authorized.decorator'

import { CreatePurchaseDto } from './dto/create-purchase.dto'
import { PurchaseService } from './purchase.service'

@Controller('property/purchase')
export class PurchaseController {
	constructor(private readonly purchaseService: PurchaseService) {}

	@Get('user/:purchaseId')
	@HttpCode(HttpStatus.OK)
	@Authorization()
	public async findPurchase(@Param('purchaseId') purchaseId: string) {
		return this.purchaseService.findPurchase(purchaseId)
	}

	@Get('user')
	@HttpCode(HttpStatus.OK)
	@Authorization()
	public async findPurchases(@Authorized('id') userId: string) {
		return this.purchaseService.findPurchases(userId)
	}

	@Get('realtor/:targetUserId')
	@HttpCode(HttpStatus.OK)
	@Authorization(UserRole.REALTOR)
	public async findUserPurchases(
		@Param('targetUserId') targetUserId: string
	) {
		return this.purchaseService.findUserPurchases(targetUserId)
	}

	@Get('realtor')
	@HttpCode(HttpStatus.OK)
	@Authorization(UserRole.REALTOR)
	public async findUsersPurchases() {
		return this.purchaseService.findUsersPurchases()
	}

	@Post()
	@HttpCode(HttpStatus.OK)
	@Authorization()
	public async addPurchase(
		@Authorized('id') userId: string,
		@Body() dto: CreatePurchaseDto
	) {
		return this.purchaseService.addPurchase(userId, dto)
	}

	@Patch(':purchaseId')
	@HttpCode(HttpStatus.OK)
	@Authorization()
	public async updatePurchase(
		@Authorized('id') userId: string,
		@Param('purchaseId') purchaseId: string,
		@Body() dto: CreatePurchaseDto
	) {
		return this.purchaseService.updatePurchase(userId, purchaseId, dto)
	}

	@Delete(':purchaseId')
	@HttpCode(HttpStatus.OK)
	@Authorization()
	public async deletePurchase(@Param('purchaseId') purchaseId: string) {
		return this.purchaseService.deletePurchase(purchaseId)
	}

	@Patch(':purchaseId/:status')
	@HttpCode(HttpStatus.OK)
	@Authorization(UserRole.REALTOR)
	public async updateStatus(
		@Param('purchaseId') purchaseId: string,
		@Param('status') status: string
	) {
		return this.purchaseService.updateStatus(purchaseId, status)
	}
}
