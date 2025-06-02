import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import * as path from 'path'

import { FileController } from './file.controller'
import { FileService } from './file.service'

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: path.join(__dirname, '..', '..', 'uploads'),
			serveRoot: '/static'
		})
	],
	controllers: [FileController],
	providers: [FileService]
})
export class FileModule {}
