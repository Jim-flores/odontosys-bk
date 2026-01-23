import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateRoleDto, UpdateRoleDto } from './dto/role.dto';
import { ensureExists } from '../../common/utils/error-utils';
import { Prisma } from '@prisma/client';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  async create(createRoleDto: CreateRoleDto) {
    const data: any = {
      name: createRoleDto.name,
      description: createRoleDto.description,
      companyId: createRoleDto.companyId,
    };

    if (createRoleDto.permissionIds && createRoleDto.permissionIds.length > 0) {
      data.permissions = {
        create: createRoleDto.permissionIds.map((permissionId) => ({
          permissionId,
        })),
      };
    }

    return this.prisma.role.create({
      data,
      include: {
        company: true,
        permissions: {
          include: {
            permission: true,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.role.findMany({
      include: {
        company: true,
        permissions: {
          include: {
            permission: true,
          },
        },
        users: true,
      },
    });
  }

  async findOne(id: string) {
    const role = await this.prisma.role.findUnique({
      where: { id },
      include: {
        company: true,
        permissions: {
          include: {
            permission: true,
          },
        },
        users: true,
      },
    });

    return ensureExists(role, id, 'Role');
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    const data: any = {};

    if (updateRoleDto.name !== undefined) data.name = updateRoleDto.name;
    if (updateRoleDto.description !== undefined) data.description = updateRoleDto.description;
    if (updateRoleDto.companyId !== undefined) data.companyId = updateRoleDto.companyId;

    if (updateRoleDto.permissionIds !== undefined) {
      await this.prisma.rolePermission.deleteMany({
        where: { roleId: id },
      });

      data.permissions = {
        create: updateRoleDto.permissionIds.map((permissionId) => ({
          permissionId,
        })),
      };
    }

    try {
      return await this.prisma.role.update({
        where: { id },
        data,
        include: {
          company: true,
          permissions: {
            include: {
              permission: true,
            },
          },
          users: true,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        ensureExists(null, id, 'Role');
      }
      throw error;
    }
  }

  async remove(id: string) {
    return this.prisma.role.delete({
      where: { id },
    });
  }

  async assignRoleToUser(userId: string, roleId: string) {
    return this.prisma.userRole.create({
      data: {
        userId,
        roleId,
      },
      include: {
        role: {
          include: {
            permissions: {
              include: {
                permission: true,
              },
            },
          },
        },
        user: true,
      },
    });
  }

  async removeRoleFromUser(userId: string, roleId: string) {
    return this.prisma.userRole.deleteMany({
      where: {
        userId,
        roleId,
      },
    });
  }
}
