import { Module } from '@nestjs/common'

import { PropertyController } from './property.controller'
import { PropertyService } from './property.service'
import { RequestModule } from './request/request.module'

@Module({
	imports: [RequestModule],
	controllers: [PropertyController],
	providers: [PropertyService]
})
export class PropertyModule {}
