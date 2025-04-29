import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class FavoritesService {
	public constructor(private readonly prismaService: PrismaService) {}

	public async favoritesProperties(id: string) {
		return await this.prismaService.favorite.findMany({
			where: {
				userId: id
			},
			include: {
				property: {
					include: {
						location: true
					}
				}
			}
		})
	}

	public async favoritesId(id: string) {
		return this.prismaService.favorite.findMany({
			where: {
				userId: id
			},
			select: {
				propertyId: true
			}
		})
	}

	public async allFavorites() {
		return await this.prismaService.favorite.findMany({
			include: {
				user: true,
				property: {
					include: {
						location: true
					}
				}
			},
			orderBy: [{ userId: 'asc' }, { favoritedAt: 'desc' }]
		})
	}

	public async addToFavorite(id: string, propertyId: string) {
		return await this.prismaService.favorite.create({
			data: {
				userId: id,
				propertyId
			}
		})
	}

	public async removeFromFavorite(id: string, propertyId: string) {
		return await this.prismaService.favorite.delete({
			where: {
				userId_propertyId: {
					userId: id,
					propertyId
				}
			}
		})
	}
}
