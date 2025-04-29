import { Module } from '@nestjs/common'
import { UserService } from 'src/user/user.service'

import { RequestController } from './request.controller'
import { RequestService } from './request.service'

@Module({
	controllers: [RequestController],
	providers: [RequestService, UserService]
})
export class RequestModule {}
