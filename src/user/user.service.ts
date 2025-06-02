import { Injectable, NotFoundException } from '@nestjs/common'
import { hash } from 'argon2'
import { AuthMethod } from 'prisma/__generated__'
import { PrismaService } from 'src/prisma/prisma.service'

import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UserService {
	public constructor(private readonly prismaService: PrismaService) {}

	public async findById(id: string) {
		const user = await this.prismaService.user.findUnique({
			where: {
				id
			},
			include: {
				accounts: true
			}
		})

		if (!user) {
			throw new NotFoundException(
				'Пользователь не найден. Пожалуйста, проверьте правильность введённых данных.'
			)
		}

		return user
	}

	public async findByEmail(email: string) {
		const user = await this.prismaService.user.findUnique({
			where: {
				email
			},
			include: {
				accounts: true
			}
		})
		return user
	}

	public async create(
		email: string,
		password: string,
		displayName: string,
		picture: string,
		method: AuthMethod,
		isVerified: boolean
	) {
		const user = await this.prismaService.user.create({
			data: {
				email,
				password: password ? await hash(password) : '',
				displayName,
				picture,
				method,
				isVerified
			},
			include: {
				accounts: true
			}
		})

		return user
	}

	public async update(userId: string, dto: UpdateUserDto) {
		const user = await this.findById(userId)

		const updatedUser = await this.prismaService.user.update({
			where: {
				id: user.id
			},
			data: {
				email: dto.email,
				displayName: dto.name,
				phoneNumber: dto.phoneNumber,
				isTwoFactorEnabled: dto.isTwoFactorEnabled
			}
		})
		return updatedUser
	}

	public async isAdmin(id: string) {
		return this.prismaService.user.findUnique({
			where: {
				id
			},
			select: {
				role: true
			}
		})
	}

	public async findAllUsers() {
		return await this.prismaService.user.findMany({
			select: {
				id: true,
				displayName: true,
				email: true,
				createdAt: true,
				picture: true
			}
		})
	}
}
