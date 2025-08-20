import { INestApplication } from '@nestjs/common'
import { SwaggerModule } from '@nestjs/swagger'
import { getSwaggerConfig } from 'src/config/swagger.config'

export function setupSwagger(app: INestApplication) {
	const swaggerConfig = getSwaggerConfig()

	const document = SwaggerModule.createDocument(app, swaggerConfig)

	SwaggerModule.setup('/documentation', app, document, {
		customCssUrl:
			'https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.1/themes/3.x/theme-material.css',
		jsonDocumentUrl: '/swagger.json',
		yamlDocumentUrl: '/swagger.yaml',
		customSiteTitle: 'moskvrealty API docs'
	})
}
