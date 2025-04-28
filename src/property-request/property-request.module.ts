import { Module } from '@nestjs/common'

import { PropertyRequestController } from './property-request.controller'
import { PropertyRequestService } from './property-request.service'

@Module({
	controllers: [PropertyRequestController],
	providers: [PropertyRequestService]
})
export class PropertyRequestModule {}
