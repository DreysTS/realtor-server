import { Body, Heading, Link, Tailwind, Text } from '@react-email/components'
import { Html } from '@react-email/html'
import * as React from 'react'

interface ConfirmationTemplateProps {
	domain: string
	token: string
}

export function ResetPasswordTemplate({
	domain,
	token
}: ConfirmationTemplateProps) {
	const resetLink = `${domain}/auth/new-password?token=${token}`

	return (
		<Tailwind>
			<Html>
				<Body className='text-black'>
					<Heading>Подтверждение почты</Heading>
					<Text>
						Привет! Чтобы подтвердить адрес электронной почты,
						пожалуйста, перейдите по следующей ссылке:
					</Text>
					<Link href={resetLink}>Подтвердить почту</Link>
					<Text>
						Эта ссылка действительна в течении 1 часа. Если вы не
						запрашивали подтверждение, просто проигнорируйте это
						сообщение.
					</Text>
					<Text>Спасибо за использование нашего сервиса!</Text>
				</Body>
			</Html>
		</Tailwind>
	)
}
