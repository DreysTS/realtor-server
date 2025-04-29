import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post
} from '@nestjs/common'
import { UserRole } from 'prisma/__generated__'
import { Authorization } from 'src/auth/decorators/auth.decorator'
import { Authorized } from 'src/auth/decorators/authorized.decorator'

import { FavoriteDto } from './dto/favorite.dto'
import { FavoritesService } from './favorites.service'

@Controller('favorites')
export class FavoritesController {
	constructor(private readonly favoritesService: FavoritesService) {}

	@Authorization()
	@Get('')
	@HttpCode(HttpStatus.OK)
	public async getFavoritesProperties(@Authorized('id') id: string) {
		return this.favoritesService.favoritesProperties(id)
	}

	@Authorization()
	@Get('ids')
	@HttpCode(HttpStatus.OK)
	public async getFavoritesId(@Authorized('id') id: string) {
		return this.favoritesService.favoritesId(id)
	}

	@Authorization(UserRole.REALTOR)
	@Get('realtor')
	@HttpCode(HttpStatus.OK)
	public async getAllFavorites() {
		return this.favoritesService.allFavorites()
	}

	@Authorization()
	@Post(':propertyId')
	public async addToFavorite(
		@Authorized('id') id: string,
		@Param('propertyId') propertyId: string
	) {
		return this.favoritesService.addToFavorite(id, propertyId)
	}

	@Authorization()
	@Delete(':propertyId')
	public async removeFromFavorite(
		@Authorized('id') id: string,
		@Param('propertyId') propertyId: string
	) {
		return this.favoritesService.removeFromFavorite(id, propertyId)
	}
}
