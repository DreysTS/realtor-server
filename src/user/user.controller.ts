import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Patch
} from '@nestjs/common'
import { UserRole } from 'prisma/__generated__'
import { Authorization } from 'src/auth/decorators/auth.decorator'
import { Authorized } from 'src/auth/decorators/authorized.decorator'

import { UpdateUserDto } from './dto/update-user.dto'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Authorization()
	@HttpCode(HttpStatus.OK)
	@Get('profile')
	public async getUser(@Authorized('id') userId: string) {
		return this.userService.getUserById(userId)
	}

	@Authorization(UserRole.ADMIN)
	@HttpCode(HttpStatus.OK)
	@Get('by-id/:id')
	public async getUserById(@Param('id') id: string) {
		return this.userService.getUserById(id)
	}

	@Authorization()
	@HttpCode(HttpStatus.OK)
	@Patch('profile')
	public async updateProfile(
		@Authorized('id') userId: string,
		@Body() dto: UpdateUserDto
	) {
		return this.userService.update(userId, dto)
	}

	@Authorization()
	@HttpCode(HttpStatus.OK)
	@Get('is-admin')
	public async isAdmin(@Authorized('id') id: string) {
		return this.userService.isAdmin(id)
	}
}
