import { Transform } from 'class-transformer'
import {
	IsBoolean,
	IsEnum,
	IsInt,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsPositive,
	IsString
} from 'class-validator'
import { BuildingType, PropertyType, SellingType } from 'prisma/__generated__'
import { BaseProperty } from 'src/libs/common/dto/base-property.dto'

export class CreateProperty extends BaseProperty {
	@Transform(({ value }) => parseFloat(value))
	@IsNumber({}, { message: 'Площадь кухни должна быть числовым значением.' })
	@IsPositive({ message: 'Площадь кухни должна быть положительной.' })
	@IsOptional()
	kitchenSquare?: number

	@Transform(({ value }) => parseFloat(value))
	@IsNumber(
		{},
		{
			message: 'Каждая площадь должна быть числовым значением.'
		}
	)
	@IsOptional()
	roomsSquare?: number

	@Transform(({ value }) => parseInt(value))
	@IsInt({ message: 'Этаж должен быть целочисленным значением.' })
	@IsPositive({ message: 'Этаж должен быть положительным.' })
	@IsOptional()
	floor?: number

	@Transform(({ value }) => parseInt(value))
	@IsInt({
		message: 'Общее количество этажей должно быть целочисленным значением.'
	})
	@IsPositive({
		message: 'Общее количество этажей должно быть положительным.'
	})
	@IsOptional()
	totalFloors?: number

	@Transform(({ value }) => value === 'true' || value === '1')
	@IsBoolean({ message: 'Вторичка должна быть булевым значением.' })
	@IsOptional()
	isSecondary?: boolean

	@Transform(({ value }) => parseInt(value))
	@IsInt({ message: 'Год постройки должен быть целочисленным значением.' })
	@IsPositive({
		message: 'Год постройки должен быть положительным значением.'
	})
	@IsOptional()
	builtYear?: number

	@Transform(({ value }) => parseFloat(value))
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
	@IsNotEmpty({ message: 'Тип здания не должен быть пустым.' })
	buildingType: BuildingType

	@IsEnum(PropertyType, { message: 'Недопустимый тип недвижимости.' })
	@IsNotEmpty({ message: 'Тип недвижимости не должен быть пустым.' })
	propertyType: PropertyType

	@IsEnum(SellingType, {
		message: 'Недопустимый статус продажи недвижимости.'
	})
	sellingType: SellingType

	@IsString({ message: 'Город должен быть строкой.' })
	@IsOptional()
	city?: string

	@IsString({ message: 'Район должен быть строкой.' })
	@IsOptional()
	district?: string

	@Transform(({ value }) => parseFloat(value))
	@IsString({ message: 'Ширина должна быть строкой.' })
	@IsOptional()
	latitude?: number

	@Transform(({ value }) => parseFloat(value))
	@IsString({ message: 'Долгота должна быть строкой.' })
	@IsOptional()
	longitude?: number
}
