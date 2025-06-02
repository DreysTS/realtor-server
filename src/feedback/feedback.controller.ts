import {
	Body,
	Controller,
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

import { CreateFeedbackDto } from './dto/create-feedback.dto'
import { FeedbackService } from './feedback.service'

@Controller('feedback')
export class FeedbackController {
	constructor(private readonly feedbackService: FeedbackService) {}

	@Authorization()
	@Get('user/:feedbackId')
	@HttpCode(HttpStatus.OK)
	public async findFeedback(@Param('feedbackId') feedbackId: string) {
		return this.feedbackService.findFeedback(feedbackId)
	}

	@Authorization()
	@Get()
	@HttpCode(HttpStatus.OK)
	public async findFeedbacks(@Authorized('id') userId: string) {
		return this.feedbackService.findFeedbacks(userId)
	}

	@Authorization(UserRole.REALTOR)
	@Get('realtor/:userId')
	@HttpCode(HttpStatus.OK)
	public async findUserFeedbacks(@Param('userId') userId: string) {
		return this.feedbackService.findUserFeedbacks(userId)
	}

	@Authorization(UserRole.REALTOR)
	@Get('realtor')
	@HttpCode(HttpStatus.OK)
	public async findUsersFeedbacks() {
		return this.feedbackService.findUsersFeedbacks()
	}

	@Authorization()
	@Post()
	@HttpCode(HttpStatus.OK)
	public async createFeedback(
		@Authorized('id') userId: string,
		@Body() dto: CreateFeedbackDto
	) {
		return this.feedbackService.createFeedback(userId, dto)
	}

	@Authorization()
	@Patch(':feedbackId')
	@HttpCode(HttpStatus.OK)
	public async updateFeedback(
		@Param('feedbackId') feedbackId: string,
		@Body() dto: CreateFeedbackDto
	) {
		return this.feedbackService.updateFeedback(feedbackId, dto)
	}

	@Authorization()
	@Patch(':feedbackId')
	@HttpCode(HttpStatus.OK)
	public async deleteFeedback(@Param('feedbackId') feedbackId: string) {
		return this.feedbackService.deleteFeedback(feedbackId)
	}
}
