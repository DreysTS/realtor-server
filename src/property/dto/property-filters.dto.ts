import { Transform } from 'class-transformer'
import { IsInt, IsNumber, IsOptional } from 'class-validator'

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
}
