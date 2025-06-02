import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

import { CreateFeedbackDto } from './dto/create-feedback.dto'
import { UpdateFeedbackDto } from './dto/update-feedback.dto'

@Injectable()
export class FeedbackService {
	public constructor(private readonly prismaService: PrismaService) {}

	public async findFeedback(feedbackId: string) {
		const feedback = await this.prismaService.feedback.findFirst({
			where: {
				id: feedbackId
			}
		})

		if (!feedback) {
			throw new NotFoundException(
				'Комменнтарий не найден. Пожалуйста, проверьте правильность введённых данных.'
			)
		}

		return feedback
	}

	public async findFeedbacks(userId: string) {
		return await this.prismaService.feedback.findMany({
			where: {
				userId
			},
			include: {
				user: true
			}
		})
	}

	public async findUserFeedbacks(userId: string) {
		return await this.prismaService.feedback.findFirst({
			where: {
				userId
			}
		})
	}

	public async findUsersFeedbacks() {
		return await this.prismaService.feedback.findMany({
			include: {
				user: true
			}
		})
	}

	public async createFeedback(userId: string, dto: CreateFeedbackDto) {
		return await this.prismaService.feedback.create({
			data: {
				content: dto.content,
				userId
			}
		})
	}

	public async updateFeedback(feedbackId: string, dto: UpdateFeedbackDto) {
		return await this.prismaService.feedback.update({
			where: {
				id: feedbackId
			},
			data: {
				content: dto.content
			}
		})
	}

	public async deleteFeedback(feedbackId: string) {
		return await this.prismaService.feedback.delete({
			where: {
				id: feedbackId
			}
		})
	}
}
