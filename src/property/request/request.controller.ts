import {
	Body,
	Controller,
	Delete,
	HttpCode,
	HttpStatus,
	Param,
	ParseFilePipe,
	Patch,
	Post,
	UploadedFiles,
	UseInterceptors
} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { UserRole } from 'prisma/__generated__'
import { Authorization } from 'src/auth/decorators/auth.decorator'
import { Authorized } from 'src/auth/decorators/authorized.decorator'
import { IMAGE_VALIDATORS } from 'src/libs/common/constants/image-validators'

import { CreateSellRequest } from './dto/create-sell-request.dto'
import { DeclineRequestDto } from './dto/decline-request.dto'
import { RequestService } from './request.service'

@Controller('property/request')
export class RequestController {
	constructor(private readonly requestService: RequestService) {}

	@UseInterceptors(FilesInterceptor('files'))
	@Authorization()
	@Post()
	@HttpCode(HttpStatus.OK)
	public async createRequest(
		@UploadedFiles(
			new ParseFilePipe({
				validators: IMAGE_VALIDATORS
			})
		)
		files: Express.Multer.File[],
		@Authorized('id') id: string,
		@Body() dto: CreateSellRequest
	) {
		return this.requestService.createRequest(id, dto, files)
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
		dto: DeclineRequestDto
	) {
		return this.requestService.declineRequest(id, dto)
	}
}
