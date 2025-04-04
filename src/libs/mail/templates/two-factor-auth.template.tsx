import { Body, Heading, Html, Tailwind, Text } from '@react-email/components'
import * as React from 'react'

interface TwoFactorAuthProps {
	token: string
}

export function TwoFactorAuthTemplate({ token }: TwoFactorAuthProps) {
	return (
		<Tailwind>
			<Html>
				<Body className='text-black'>
					<Heading>Двухфакторная аутентификация</Heading>
					<Text>
						Ваш код двухфакторной аутентификации:{' '}
						<strong>{token}</strong>
					</Text>
					<Text>
						Пожалуйста, введите этот код в приложении для завершения
						процесса аутентификации.
					</Text>
					<Text>
						Если вы не запрашивали этот код, просто проигнорируйте
						это сообщение.
					</Text>
				</Body>
			</Html>
		</Tailwind>
	)
}
