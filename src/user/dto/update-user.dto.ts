import {
	IsBoolean,
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsString
} from 'class-validator'

export class UpdateUserDto {
	@IsString({ message: 'Имя должно быть строкой.' })
	@IsNotEmpty({ message: 'Имя обязательно для заполнения.' })
	name: string

	@IsString({ message: 'Email должен быть строкой.' })
	@IsEmail({}, { message: 'Некорректный формат email.' })
	@IsNotEmpty({ message: 'Email обязателен для заполнения.' })
	email: string

	@IsString({ message: 'Телефон должен быть строкой.' })
	@IsOptional()
	phoneNumber?: string

	@IsBoolean({ message: 'isTwoFactorEnabled должно быть булевым значением.' })
	isTwoFactorEnabled: boolean
}
