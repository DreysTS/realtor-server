import { ApiProperty } from '@nestjs/swagger'

export class CreatedRegisterResponse {
	@ApiProperty({
		description:
			'Успешное создание пользователя в базе данных. Для подтверждения аккаунта нужно перейти по ссылке, которая прийдёт на почту.',
		example:
			'Вы успешно зарегистрировались. Пожалуйста, подтвердите ваш email. Сообщение было отправлено на ваш почтовый адрес.'
	})
	message: string
}
