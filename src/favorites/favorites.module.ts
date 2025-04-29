import { Module } from '@nestjs/common'
import { UserService } from 'src/user/user.service'

import { FavoritesController } from './favorites.controller'
import { FavoritesService } from './favorites.service'

@Module({
	controllers: [FavoritesController],
	providers: [FavoritesService, UserService]
})
export class FavoritesModule {}
