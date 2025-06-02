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

import { CreateRequest } from './dto/create-request.dto'
import { DeclineRequestDto } from './dto/decline-request.dto'
import { RequestService } from './request.service'

@Controller('property/request')
export class RequestController {
	constructor(private readonly requestService: RequestService) {}

	@Authorization()
	@Get('user')
	@HttpCode(HttpStatus.OK)
	public async findRequests(@Authorized('id') userId: string) {
		return this.requestService.findRequests(userId)
	}

	@Authorization(UserRole.REALTOR)
	@Get('user/:targetUserId')
	@HttpCode(HttpStatus.OK)
	public async findUserRequests(
		@Param('targetUserId') targetUserId?: string
	) {
		return this.requestService.findUserRequests(targetUserId)
	}

	@Authorization(UserRole.REALTOR)
	@Get('realtor')
	@HttpCode(HttpStatus.OK)
	public async findUsersRequests() {
		return this.requestService.findUsersRequests()
	}

	@Authorization(UserRole.REALTOR)
	@Get(':requestId')
	@HttpCode(HttpStatus.OK)
	public async findRequestById(@Param('requestId') requestId?: string) {
		return this.requestService.findRequestById(requestId)
	}

	@Authorization()
	@Post()
	@HttpCode(HttpStatus.CREATED)
	public async createRequest(
		@Authorized('id') id: string,
		@Body() dto: CreateRequest
	) {
		return this.requestService.createRequest(id, dto)
	}

	@Authorization()
	@Delete(':requestId')
	@HttpCode(HttpStatus.OK)
	public async deleteRequest(
		@Authorized('id') userId: string,
		@Param('requestId') requestId: string
	) {
		return this.requestService.deleteRequest(userId, requestId)
	}

	@Authorization(UserRole.REALTOR)
	@Patch(':id/accept')
	@HttpCode(HttpStatus.OK)
	public async acceptRequest(@Param('id') id: string) {
		return this.requestService.acceptRequest(id)
	}

	@Authorization(UserRole.REALTOR)
	@Patch(':id/decline')
	@HttpCode(HttpStatus.OK)
	public async declineRequest(
		@Param('id') id: string,
		@Body() dto: DeclineRequestDto
	) {
		return this.requestService.declineRequest(id, dto)
	}
}
