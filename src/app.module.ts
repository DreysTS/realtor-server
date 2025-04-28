import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import * as path from 'path'

import { AuthModule } from './auth/auth.module'
import { EmailConfirmationModule } from './auth/email-confirmation/email-confirmation.module'
import { PasswordRecoveryModule } from './auth/password-recovery/password-recovery.module'
import { ProviderModule } from './auth/provider/provider.module'
import { TwoFactorAuthModule } from './auth/two-factor-auth/two-factor-auth.module'
import { IS_DEV_ENV } from './libs/common/utils/is-dev.util'
import { MailModule } from './libs/mail/mail.module'
import { PrismaModule } from './prisma/prisma.module'
import { PropertyModule } from './property/property.module'
import { UserModule } from './user/user.module'
import { FavoritesModule } from './favorites/favorites.module';
import { PropertyRequestModule } from './property-request/property-request.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			ignoreEnvFile: !IS_DEV_ENV,
			isGlobal: true
		}),
		ServeStaticModule.forRoot({
			rootPath: path.join(__dirname, '..', 'uploads'),
			serveRoot: '/static'
		}),
		PrismaModule,
		AuthModule,
		UserModule,
		ProviderModule,
		EmailConfirmationModule,
		MailModule,
		TwoFactorAuthModule,
		PasswordRecoveryModule,
		PropertyModule,
		FavoritesModule,
		PropertyRequestModule
	]
})
export class AppModule {}
