import { Module } from '@nestjs/common'
import { UserService } from 'src/user/user.service'

import { PurchaseController } from './purchase.controller'
import { PurchaseService } from './purchase.service'

@Module({
	controllers: [PurchaseController],
	providers: [PurchaseService, UserService]
})
export class PurchaseModule {}
