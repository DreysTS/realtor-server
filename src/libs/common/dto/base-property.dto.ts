import { Transform } from 'class-transformer'
import {
	IsInt,
	IsNotEmpty,
	IsNumber,
	IsPositive,
	IsString
} from 'class-validator'

export class BaseProperty {
	@IsString({ message: 'Заголовок должен быть строкой.' })
	@IsNotEmpty({ message: 'Заголовок не должен быть пустым.' })
	title: string

	@IsString({ message: 'Описание должно быть строкой.' })
	@IsNotEmpty({ message: 'Описание не должно быть пустым.' })
	description: string

	@Transform(({ value }) => parseFloat(value))
	@IsNumber({}, { message: 'Цена должна быть числовым значением.' })
	@IsPositive({ message: 'Цена должна быть положительной.' })
	@IsNotEmpty({ message: 'Цена не должна быть пустой.' })
	price: number

	@Transform(({ value }) => parseFloat(value))
	@IsNumber({}, { message: 'Площадь должна быть числовым значением.' })
	@IsPositive({ message: 'Площадь должна быть положительной.' })
	@IsNotEmpty({ message: 'Площадь не должна быть пустой.' })
	square: number

	@Transform(({ value }) => parseInt(value))
	@IsInt({ message: 'Количество комнат должно быть целочисловым значением.' })
	@IsPositive({ message: 'Количество комнат должно быть положительным.' })
	@IsNotEmpty({ message: 'Количество комнат не должно быть пустым.' })
	rooms: number

	@IsString({ message: 'Адрес должен быть строкой.' })
	@IsNotEmpty({ message: 'Адрес не должен быть пустым.' })
	address: string
}
