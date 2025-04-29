import { FileTypeValidator, MaxFileSizeValidator } from '@nestjs/common'

export const IMAGE_VALIDATORS = [
	new FileTypeValidator({
		fileType: /\/(jpg|jpeg|png|webp|gif)$/
	}),
	new MaxFileSizeValidator({
		maxSize: 1024 * 1024 * 10,
		message: 'Файл должен быть не более 10Мб'
	})
]
