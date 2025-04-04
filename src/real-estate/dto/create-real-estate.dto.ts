import { Type } from 'class-transformer'
import {
	IsArray,
	IsBoolean,
	IsEnum,
	IsInt,
	IsOptional,
	IsString,
	ValidateNested
} from 'class-validator'
import { ImageType, PropertyType, Status } from 'prisma/__generated__'

export class ImageDto {
	@IsString({ message: 'Url должен быть строкой.' })
	url: string

	@IsInt({ message: 'Порядок должен быть числовым значением.' })
	@IsOptional()
	order?: number

	@IsString({ message: 'Описание должно быть строкой.' })
	@IsOptional()
	description?: string

	@IsBoolean({ message: 'Главная картинка должна быть булевым занчением.' })
	@IsOptional()
	isMain?: boolean

	@IsEnum(ImageType, { message: 'Недопустимый тип изображения.' })
	@IsOptional()
	type: ImageType
}

export class CreateRealEstateDto {
	@IsArray({
		message: 'Изображение должны быть представлены в виде массива.'
	})
	@ValidateNested({ each: true })
	@Type(() => ImageDto)
	images: ImageDto[]

	@IsInt({ message: 'Цена должна быть числовым значением.' })
	price: number

	@IsString({ message: 'Заголовок должен быть строкой.' })
	title: string

	@IsString({ message: 'Город должен быть строкой.' })
	city: string

	@IsString({ message: 'Район должен быть строкой.' })
	@IsOptional()
	district?: string

	@IsString({ message: 'Улица должена быть строкой.' })
	@IsOptional()
	street: string

	@IsString({ message: 'Номер дома должен быть строкой.' })
	@IsOptional()
	houseNumber: string

	@IsInt({ message: 'Площадь должна быть числовым значением.' })
	square: number

	@IsInt({ message: 'Жилая площадь должна быть числовым значением.' })
	@IsOptional()
	livingSpace?: number

	@IsInt({ message: 'Текущий этаж должен быть числовым значением.' })
	@IsOptional()
	currentFloor?: number

	@IsInt({
		message: 'Количество этажей в доме должно быть числовым значением.'
	})
	floorsInTheHouse: number

	@IsInt({ message: 'Количество комнат должно быть числовым значением.' })
	rooms: number

	@IsEnum(PropertyType, { message: 'Недопустимый тип недвижимости.' })
	propertyType: PropertyType

	@IsEnum(Status, { message: 'Недопустимый тип статуса.' })
	status: Status

	@IsBoolean({
		message: 'Статус новой недвижимости должен быть булевым значением.'
	})
	@IsOptional()
	isNewBuilding: boolean

	@IsInt({ message: 'Год постройки должен быть числовым значением.' })
	@IsOptional()
	builtYear?: number

	@IsString({ message: 'Описание недвижимости должно быть строкой.' })
	@IsOptional()
	description?: string

	@IsString({ message: 'Id застройщика должно быть строкой.' })
	@IsOptional()
	developerId?: string
}
