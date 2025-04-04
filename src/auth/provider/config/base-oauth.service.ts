import {
	BadRequestException,
	Injectable,
	UnauthorizedException
} from '@nestjs/common'

import { TypeBaseProviderOptions } from './types/base-provider-options.type'
import { TypeUserInfo } from './types/user-info.type'

@Injectable()
export class BaseOAuthService {
	private BASE_URL: string

	public constructor(private readonly options: TypeBaseProviderOptions) {}

	protected async extractUserInfo(data: any): Promise<TypeUserInfo> {
		return {
			...data,
			provider: this.options.name
		}
	}

	public getAuthUrl() {
		const query = new URLSearchParams({
			response_type: 'code',
			client_id: this.options.client_id,
			redirect_uri: this.getRedirectUrl(),
			scope: (this.options.scopes ?? []).join(' '),
			access_type: 'offline',
			prompt: 'select-account'
		})

		return `${this.options.access_url}?${query}`
	}

	public async findUserByCode(code: string): Promise<TypeUserInfo> {
		const client_id = this.options.client_id
		const client_secret = this.options.client_secret

		const tokenQuery = new URLSearchParams({
			client_id,
			client_secret,
			code,
			redirect_uri: this.getRedirectUrl(),
			grant_type: 'authorization_code'
		})

		const tokenRequest = await fetch(this.options.access_url, {
			method: 'POST',
			body: tokenQuery,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Accept: 'application/json'
			}
		})

		if (!tokenRequest.ok) {
			throw new BadRequestException(
				`Не удалось получить пользователя с ${this.options.profile_url}. Проверьте правильность токена доступа.`
			)
		}

		const token = await tokenRequest.json()

		if (!token.access_token) {
			throw new BadRequestException(
				`Нет токенов с ${this.options.access_url}. Убедитесь, что код авторизации действителен.`
			)
		}

		const userRequest = await fetch(this.options.profile_url, {
			headers: {
				Authorization: `Bearer ${token.access_token}`
			}
		})

		if (!userRequest.ok) {
			throw new UnauthorizedException(
				`Не удалось получить пользователя с ${this.options.profile_url}. Проверьте правильность токена доступа.`
			)
		}

		const user = await userRequest.json()
		const userData = await this.extractUserInfo(user)

		return {
			...userData,
			access_token: token.access_token,
			refresh_token: token.refresh_token,
			expires_at: token.expires_at || token.expires_in,
			provider: this.options.name
		}
	}

	public getRedirectUrl() {
		return `${this.BASE_URL}/auth/ouath/callback/${this.options.name}`
	}

	set baseUrl(value: string) {
		this.BASE_URL = value
	}

	get name() {
		return this.options.name
	}

	get access_url() {
		return this.options.access_url
	}

	get profile_url() {
		return this.options.profile_url
	}

	get scopes() {
		return this.options.scopes
	}
}
