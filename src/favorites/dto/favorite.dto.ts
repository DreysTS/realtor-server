import { IsNotEmpty, IsString } from 'class-validator'

export class FavoriteDto {
	@IsString({ message: 'Id недвижимости должен быть строкой.' })
	@IsNotEmpty({ message: 'Id недвижимости не должен быть пустым.' })
	propertyId: string
}
