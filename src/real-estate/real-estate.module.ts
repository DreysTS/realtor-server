import { Module } from '@nestjs/common'
import { UserService } from 'src/user/user.service'

import { RealEstateController } from './real-estate.controller'
import { RealEstateService } from './real-estate.service'

@Module({
	controllers: [RealEstateController],
	providers: [RealEstateService, UserService]
})
export class RealEstateModule {}
