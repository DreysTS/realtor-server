import { Module } from '@nestjs/common'
import { UserService } from 'src/user/user.service'

import { FeedbackController } from './feedback.controller'
import { FeedbackService } from './feedback.service'

@Module({
	controllers: [FeedbackController],
	providers: [FeedbackService, UserService]
})
export class FeedbackModule {}
