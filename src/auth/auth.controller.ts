import {
	BadRequestException,
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	Query,
	Req,
	Res,
	UseGuards
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
	ApiBadRequestResponse,
	ApiConflictResponse,
	ApiCreatedResponse,
	ApiInternalServerErrorResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiUnauthorizedResponse
} from '@nestjs/swagger'
import { Recaptcha } from '@nestlab/google-recaptcha'
import { Request, Response } from 'express'

import { AuthService } from './auth.service'
import { CreatedRegisterResponse } from './dto/auth.dto'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'
import { AuthProviderGuard } from './guards/provider.guard'
import { ProviderService } from './provider/provider.service'

@Controller('auth')
export class AuthController {
	public constructor(
		private readonly authService: AuthService,
		private readonly configService: ConfigService,
		private readonly providerService: ProviderService
	) {}

	/* ----- Separator ----- */

	@ApiOperation({
		summary: 'Регистрация аккаунта',
		description:
			'Для регистрации необходимо придумать имя пользователя, указать свой email и придумать пароль. После регистраици на почту придёт подтверждение'
	})
	@ApiCreatedResponse({
		description: 'Удачная регистрация аккаунта',
		type: CreatedRegisterResponse
	})
	@ApiBadRequestResponse({
		description: 'Некорректные введённые данные'
	})
	@ApiConflictResponse({
		description:
			'Пользователь, которого хотят зарегистрировать, уже существует'
	})
	@Recaptcha()
	@Post('register')
	@HttpCode(HttpStatus.CREATED)
	public async register(@Body() dto: RegisterDto) {
		return this.authService.register(dto)
	}

	/* ----- Separator ----- */

	@ApiOperation({
		summary: 'Вход в аккаунт',
		description:
			'Для входа в аккаунт требуется ввести email и пароль. При успешном входе сервер отдаёт сессию.'
	})
	@ApiOkResponse({
		description: 'Возвращает сгенерированную сессионную куку'
	})
	@ApiNotFoundResponse({
		description: 'Пользователь не найден: неверный пароль или email'
	})
	@ApiUnauthorizedResponse({
		description:
			'Аккаунт не подтверждён. Необходимо посмотреть email и подтвердить почту или запросить новый токен.'
	})
	@Recaptcha()
	@Post('login')
	@HttpCode(HttpStatus.OK)
	public async login(@Req() req: Request, @Body() dto: LoginDto) {
		return this.authService.login(req, dto)
	}

	/* ----- Separator ----- */

	@UseGuards(AuthProviderGuard)
	@Get('/oauth/callback/:provider')
	public async callback(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response,
		@Query('code') code: string,
		@Param('provider') provider: string
	) {
		if (!code) {
			throw new BadRequestException(
				'Не был предоставлен код авторизации.'
			)
		}

		await this.authService.extractProfileFromCode(req, provider, code)

		return res.redirect(
			`${this.configService.getOrThrow<string>('ALLOWED_ORIGIN')}`
		)
	}

	/* ----- Separator ----- */

	@UseGuards(AuthProviderGuard)
	@Get('/oauth/connect/:provider')
	public async connect(@Param('provider') provider: string) {
		const providerInstance = this.providerService.findByService(provider)

		return {
			url: providerInstance.getAuthUrl()
		}
	}

	/* ----- Separator ----- */

	@ApiOperation({
		summary: 'Выход из аккаунта'
	})
	@ApiOkResponse({
		description: 'Удачный выход из аккаунта'
	})
	@ApiInternalServerErrorResponse({
		description: 'Не удалось завершить сессию'
	})
	@Post('logout')
	@HttpCode(HttpStatus.OK)
	public async logout(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response
	) {
		return this.authService.logout(req, res)
	}

	/* ----- Separator ----- */
}
