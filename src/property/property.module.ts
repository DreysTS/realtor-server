import { Module } from '@nestjs/common'
import { UserService } from 'src/user/user.service'

import { PropertyController } from './property.controller'
import { PropertyService } from './property.service'
import { RequestModule } from './request/request.module'

@Module({
	imports: [RequestModule],
	controllers: [PropertyController],
	providers: [PropertyService, UserService]
})
export class PropertyModule {}
