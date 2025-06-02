import {
	IsInt,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString
} from 'class-validator'

export class CreatePurchaseDto {
	@IsString({ message: 'Описание должно быть строкой.' })
	@IsNotEmpty({ message: 'Описание не должно быть пустым.' })
	description: string

	@IsNotEmpty({ message: 'Номер телефона должен быть указан для связи.' })
	phone_number: string

	@IsNumber({}, { message: 'Минимальный бюджет должен быть строкой.' })
	@IsOptional()
	budget_min?: number

	@IsNumber({}, { message: 'Максимальный бюджет должен быть строкой.' })
	@IsOptional()
	budget_max?: number

	@IsInt({ message: 'Количество комнат должно быть целым числом.' })
	@IsOptional()
	rooms?: number

	@IsNumber({}, { message: 'Минимальная площадь должна быть строкой.' })
	@IsOptional()
	area_min?: number

	@IsNumber({}, { message: 'Максимальная площадь должна быть строкой.' })
	@IsOptional()
	area_max?: number

	@IsString({ message: 'Способ связи должен быть строкой.' })
	@IsOptional()
	contact_method?: string
}
