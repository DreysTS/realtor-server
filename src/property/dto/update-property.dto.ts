import { PartialType } from '@nestjs/mapped-types'
import {
	IsArray,
	IsBoolean,
	IsEnum,
	IsInt,
	IsNumber,
	IsOptional,
	IsPositive,
	IsString
} from 'class-validator'
import {
	BuildingType,
	PropertyType,
	RequestStatus,
	SellingType
} from 'prisma/__generated__'

import { CreateProperty } from './create-property.dto'

export class UpdatePropertyDto {
	@IsString({ message: 'Заголовок должен быть строкой.' })
	@IsOptional()
	title?: string

	@IsString({ message: 'Описание должно быть строкой.' })
	@IsOptional()
	description?: string

	@IsNumber({}, { message: 'Цена должна быть числовым значением.' })
	@IsPositive({ message: 'Цена должна быть положительной.' })
	@IsOptional()
	price?: number

	@IsNumber({}, { message: 'Площадь должна быть числовым значением.' })
	@IsPositive({ message: 'Площадь должна быть положительной.' })
	@IsOptional()
	square?: number

	@IsInt({ message: 'Количество комнат должно быть целочисловым значением.' })
	@IsPositive({ message: 'Количество комнат должно быть положительным.' })
	@IsOptional()
	rooms?: number

	@IsNumber({}, { message: 'Площадь кухни должна быть числовым значением.' })
	@IsPositive({ message: 'Площадь кухни должна быть положительной.' })
	@IsOptional()
	kitchenSquare?: number

	@IsArray({ message: 'Площади комнат должны быть массивом.' })
	@IsNumber(
		{},
		{
			each: true,
			message: 'Каждая площадь должна быть числовым значением.'
		}
	)
	@IsOptional()
	roomsSquare?: number[]

	@IsInt({ message: 'Этаж должен быть целочисленным значением.' })
	@IsPositive({ message: 'Этаж должен быть положительным.' })
	@IsOptional()
	floor?: number

	@IsInt({
		message: 'Общее количество этажей должно быть целочисленным значением.'
	})
	@IsPositive({
		message: 'Общее количество этажей должно быть положительным.'
	})
	@IsOptional()
	totalFloors?: number

	@IsBoolean({ message: 'Вторичка должна быть булевым значением.' })
	@IsOptional()
	isSecondary?: boolean

	@IsInt({ message: 'Год постройки должен быть целочисленным значением.' })
	@IsPositive({
		message: 'Год постройки должен быть положительным значением.'
	})
	@IsOptional()
	builtYear?: number

	@IsNumber(
		{},
		{ message: 'Высота потолков должна быть числовым значением.' }
	)
	@IsPositive({
		message: 'Высота потолков должна быть положительным значением.'
	})
	@IsOptional()
	ceilingHeight?: number

	@IsEnum(BuildingType, { message: 'Недопустимое значение типа здания.' })
	@IsOptional()
	buildingType?: BuildingType

	@IsEnum(PropertyType, { message: 'Недопустимый тип недвижимости.' })
	@IsOptional()
	propertyType?: PropertyType

	@IsEnum(SellingType, {
		message: 'Недопустимый статус продажи недвижимости.'
	})
	@IsOptional()
	sellingType?: SellingType

	@IsEnum(RequestStatus, { message: 'Недопустимый статус заявки.' })
	@IsOptional()
	requestStatus?: RequestStatus

	@IsString({ message: 'Причина отказа должна быть строкой.' })
	@IsOptional()
	rejectReason?: string

	@IsString({ message: 'Адрес должен быть строкой.' })
	@IsOptional()
	address?: string

	@IsString({ message: 'Город должен быть строкой.' })
	@IsOptional()
	city?: string

	@IsString({ message: 'Район должен быть строкой.' })
	@IsOptional()
	district?: string

	@IsString({ message: 'Ширина должна быть строкой.' })
	@IsOptional()
	latitude?: number

	@IsString({ message: 'Долгота должна быть строкой.' })
	@IsOptional()
	longitude?: number
}

export class UpdateProperty extends PartialType(CreateProperty) {}
