import { DocumentBuilder } from '@nestjs/swagger'

export function getSwaggerConfig() {
	return new DocumentBuilder()
		.setTitle('API сайта агента недвижимости')
		.setDescription(
			'Данная апишка нужна для того, чтобы понимать, какие методы RESTful API запросов имеются по каждому сервису и контроллеру, какие входные данные они принимают и какие ответы отдают при разных поведениях. Так же это хорошо поможет при написани фронтэнда и тестов.'
		)
		.setVersion('1.0.0')
		.setContact(
			'Timofey Guryanov',
			'https://github.com/DreysTS',
			'timoha.lighter130202@gmail.com'
		)
		.addCookieAuth()
		.build()
}
