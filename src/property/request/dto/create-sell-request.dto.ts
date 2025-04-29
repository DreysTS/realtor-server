import { IsOptional, IsString } from 'class-validator'
import { BaseProperty } from 'src/libs/common/dto/base-property.dto'

export class CreateSellRequest extends BaseProperty {
	@IsString({ message: 'Причина отказа должна быть строкой.' })
	@IsOptional()
	rejectReason?: string
}
