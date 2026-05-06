import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePermissionDto, UpdatePermissionDto } from './dto/permission.dto';
import { ensureExists } from '../../common/utils/error-utils';
import { Prisma } from '@prisma/client';

@Injectable()
export class PermissionsService {
  constructor(private prisma: PrismaService) {}

  async create(createPermissionDto: CreatePermissionDto) {
    return this.prisma.permission.create({
      data: {
        key: createPermissionDto.key,
        description: createPermissionDto.description,
      },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });
  }

  async findAll() {
    const roles = await this.prisma.role.findMany({
      select: {
        id: true,
        name:true,
      }
    })
    const permission = await this.prisma.permission.findMany({
      select: {
        id: true,
        key: true,
      }
    })
    return { roles, permission }
  }

  async findOne(id: string) {
    const permission = await this.prisma.permission.findUnique({
      where: { id },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });

    return ensureExists(permission, id, 'Permission');
  }

  async update(id: string, updatePermissionDto: UpdatePermissionDto) {
    try {
      return await this.prisma.permission.update({
        where: { id },
        data: updatePermissionDto,
        include: {
          roles: {
            include: {
              role: true,
            },
          },
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        ensureExists(null, id, 'Permission');
      }
      throw error;
    }
  }

  async remove(id: string) {
    return this.prisma.permission.delete({
      where: { id },
    });
  }
}
