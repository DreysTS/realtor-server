import { Global, Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import * as path from 'path'

import { FileService } from './file.service'

@Global()
@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: path.join(__dirname, '..', '..', 'uploads'),
			serveRoot: '/static'
		})
	],
	providers: [FileService],
	exports: [FileService]
})
export class FileModule {}
