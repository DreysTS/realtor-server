/* eslint-disable prettier/prettier */
import { IsInt, IsOptional, IsString } from 'class-validator'

export class CreateDeveloperDto {
	@IsString({ message: 'Название застройщика должно быть строкой.' })
	name: string

	@IsString({ message: 'Ссылка на сайт застройщика должна быть строкой.' })
	@IsOptional()
	website?: string

	@IsInt({
		message: 'Год основания компании застройщика должен быть числом.'
	})
	@IsOptional()
	foundedYear?: number

	@IsString({ message: 'Ссылка на логотип застройщика должна быть строкой.' })
	logo?: string
}
