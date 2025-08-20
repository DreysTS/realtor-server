import { ApiProperty } from '@nestjs/swagger'
import {
	IsEmail,
	IsNotEmpty,
	IsString,
	MinLength,
	Validate
} from 'class-validator'
import { IsPasswordsMatchingConstraint } from 'src/libs/common/decorators/is-passwords-matching-constraint.decorator'

export class RegisterDto {
	@ApiProperty({
		description: 'Имя пользователя',
		example: 'John Doe'
	})
	@IsString({ message: 'Имя должно быть строкой.' })
	@IsNotEmpty({ message: 'Поле имени не должно быть пустым.' })
	name: string

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
	@MinLength(6, {
		message: 'Пароль должен содержать минимум 6 симоволов.'
	})
	password: string

	@ApiProperty({
		description: 'Подтверждение пароля для аккаунта',
		example: 'sOmEhArDpAsSwOrD19964^^',
		minLength: 6
	})
	@IsString({ message: 'Подтверждение пароля должно быть строкой.' })
	@IsNotEmpty({ message: 'Подтверждение пароля не должно быть пустым.' })
	@MinLength(6, {
		message: 'Подтверждение пароля должно содержать минимум 6 симоволов.'
	})
	@Validate(IsPasswordsMatchingConstraint, {
		message: 'Пароли должны совпадать.'
	})
	passwordRepeat: string
}
