import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AuthModule } from './auth/auth.module'
import { EmailConfirmationModule } from './auth/email-confirmation/email-confirmation.module'
import { PasswordRecoveryModule } from './auth/password-recovery/password-recovery.module'
import { ProviderModule } from './auth/provider/provider.module'
import { TwoFactorAuthModule } from './auth/two-factor-auth/two-factor-auth.module'
import { FavoritesModule } from './favorites/favorites.module'
import { FileModule } from './file/file.module'
import { IS_DEV_ENV } from './libs/common/utils/is-dev.util'
import { MailModule } from './libs/mail/mail.module'
import { PrismaModule } from './prisma/prisma.module'
import { PropertyModule } from './property/property.module'
import { UserModule } from './user/user.module'
import { FeedbackModule } from './feedback/feedback.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			ignoreEnvFile: !IS_DEV_ENV,
			isGlobal: true
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
		FileModule,
		FeedbackModule
	]
})
export class AppModule {}
