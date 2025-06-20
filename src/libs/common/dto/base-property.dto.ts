import {
	ArrayMinSize,
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

	@IsString({ each: true, message: 'Укажите хотя бы одну картинку.' })
	@ArrayMinSize(1, { message: 'Должна быть хотя бы одна картинка.' })
	@IsNotEmpty({ message: 'Путь к картинке не может быть пустым.' })
	images: string[]

	@IsNumber({}, { message: 'Цена должна быть числовым значением.' })
	@IsPositive({ message: 'Цена должна быть положительной.' })
	@IsNotEmpty({ message: 'Цена не должна быть пустой.' })
	price: number

	@IsNumber({}, { message: 'Площадь должна быть числовым значением.' })
	@IsPositive({ message: 'Площадь должна быть положительной.' })
	@IsNotEmpty({ message: 'Площадь не должна быть пустой.' })
	square: number

	@IsInt({ message: 'Количество комнат должно быть целочисловым значением.' })
	@IsNotEmpty({ message: 'Количество комнат не должно быть пустым.' })
	rooms: number

	@IsString({ message: 'Адрес должен быть строкой.' })
	@IsNotEmpty({ message: 'Адрес не должен быть пустым.' })
	address: string
}
