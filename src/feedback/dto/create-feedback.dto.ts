import { IsNotEmpty, IsString } from 'class-validator'

export class CreateFeedbackDto {
	@IsString({ message: 'Сообщение должно быть строкой.' })
	@IsNotEmpty({ message: 'Сообщение должно быть обязательным.' })
	content: string
}
