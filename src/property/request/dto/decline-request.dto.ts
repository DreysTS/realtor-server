import { IsNotEmpty, IsString } from 'class-validator'

export class DeclineRequestDto {
	@IsString({ message: 'Причина отказа должна быть строкой.' })
	@IsNotEmpty({ message: 'Причина отказа должна быть указана.' })
	rejectionReason: string
}
