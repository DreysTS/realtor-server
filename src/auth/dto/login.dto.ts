import { ApiProperty } from '@nestjs/swagger'
import {
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsString,
	MinLength
} from 'class-validator'

export class LoginDto {
	@ApiProperty({
		description: 'Почта пользователя',
		example: 'johndoe@example.com'
	})
	@IsString({ message: 'Email должен быть строкой.' })
	@IsEmail({}, { message: 'Некорректный формат email.' })
	@IsNotEmpty({ message: 'Поле email не должно быть пустым.' })
	email: string

	@ApiProperty({
		description: 'Пароль для аккаунта',
		example: 'sOmEhArDpAsSwOrD19964^^',
		minLength: 6
	})
	@IsString({ message: 'Пароль должен быть строкой.' })
	@IsNotEmpty({ message: 'Поле пароля не должно быть пустым.' })
	@MinLength(6, { message: 'Пароль должен содержать минимум 6 симоволов.' })
	password: string

	@ApiProperty({
		description: 'Код двухфакторной аутентификации',
		example: '999999'
	})
	@IsOptional()
	@IsString()
	code: string
}
