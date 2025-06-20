import { Transform } from 'class-transformer'
import { IsInt, IsNumber, IsOptional } from 'class-validator'
import { BuildingType, PropertyType } from 'prisma/__generated__'
import { parseBoolean } from 'src/libs/common/utils/parse-boolean.util'

export class PropertyFiltersDto {
	@IsOptional()
	@IsNumber()
	@Transform(({ value }) => parseInt(value))
	minPrice: number = 0

	@IsOptional()
	@IsNumber()
	@Transform(({ value }) => parseInt(value))
	maxPrice: number = 100000000

	@IsOptional()
	@IsNumber()
	@Transform(({ value }) => parseInt(value))
	minSquare: number

	@IsOptional()
	@IsNumber()
	@Transform(({ value }) => parseInt(value))
	maxSquare: number

	@IsOptional()
	@IsInt()
	@Transform(({ value }) => parseInt(value))
	rooms: number

	@IsOptional()
	@Transform(({ value }) => value.toUpperCase())
	buildingType: BuildingType

	@IsOptional()
	@Transform(({ value }) => value.toUpperCase())
	propertyType: PropertyType

	@IsOptional()
	@Transform(({ value }) => parseBoolean(value))
	isSecondary: boolean

	@IsOptional()
	@Transform(({ value }) => value?.split(','))
	sortBy?: string[]

	@IsOptional()
	@IsInt()
	@Transform(({ value }) => parseInt(value))
	page?: number
}
