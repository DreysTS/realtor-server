import { IsEnum, IsOptional, IsString } from 'class-validator'
import { RequestStatus } from 'prisma/__generated__'
import { BaseProperty } from 'src/libs/common/dto/base-property.dto'

export class CreateSellPropertyRequest extends BaseProperty {
	@IsEnum(RequestStatus, { message: 'Недопустимый статус заявки.' })
	requestStatus: RequestStatus

	@IsString({ message: 'Причина отказа должна быть строкой.' })
	@IsOptional()
	rejectReason?: string
}
