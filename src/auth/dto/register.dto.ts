import {
	IsEmail,
	IsNotEmpty,
	IsString,
	MinLength,
	Validate
} from 'class-validator'
import { IsPasswordsMatchingConstraint } from 'src/libs/common/decorators/is-passwords-matching-constraint.decorator'

export class RegisterDto {
	@IsString({ message: 'Имя должно быть строкой.' })
	@IsNotEmpty({ message: 'Поле имени не должно быть пустым.' })
	name: string

	@IsString({ message: 'Email должен быть строкой.' })
	@IsEmail({}, { message: 'Некорректный формат email.' })
	@IsNotEmpty({ message: 'Поле email не должно быть пустым.' })
	email: string

	@IsString({ message: 'Пароль должен быть строкой.' })
	@IsNotEmpty({ message: 'Поле пароля не должно быть пустым.' })
	@MinLength(6, {
		message: 'Пароль должен содержать минимум 6 симоволов.'
	})
	password: string

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
