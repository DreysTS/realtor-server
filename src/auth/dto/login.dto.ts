import {
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsString,
	MinLength
} from 'class-validator'

export class LoginDto {
	@IsString({ message: 'Email должен быть строкой.' })
	@IsEmail({}, { message: 'Некорректный формат email.' })
	@IsNotEmpty({ message: 'Поле email не должно быть пустым.' })
	email: string

	@IsString({ message: 'Пароль должен быть строкой.' })
	@IsNotEmpty({ message: 'Поле пароля не должно быть пустым.' })
	@MinLength(6, { message: 'Пароль должен содержать минимум 6 симоволов.' })
	password: string

	@IsOptional()
	@IsString()
	code: string
}
