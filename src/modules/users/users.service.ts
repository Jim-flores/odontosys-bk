import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { CreateUserDto, UpdateUserDto } from "./dto/user.dto";
import { ensureExists } from "../../common/utils/error-utils";
import { GetUsersQuery } from "./dto/user-query.dto";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        name: createUserDto.name,
        lastName: createUserDto.lastName,
        email: createUserDto.email,
        status: createUserDto.status,
        dni: createUserDto.dni,
        phone: createUserDto.phone,
        address: createUserDto.address,
        password: hashedPassword,
        branchId: createUserDto.branchId,
      },
    });
    // Solo el primer rol
    await this.prisma.userRole.create({
      data: {
        userId: user.id,
        roleId: createUserDto.roles[0],
      },
    });
    return "Usuario creado exitosamente";
  }

  async findAll(query: GetUsersQuery) {
    const { page, pageSize, search, sortBy, status } = query;
    const where: any = {
      ...(status && { status }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { lastName: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
        ],
      }),
    };

    // const orderBy =
    //   sortBy === "lastName"
    //     ? [{ lastName: order }, { name: order }]
    //     : { [sortBy]: order };

    const [rows, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        where,
        select: {
          id: true,
          name: true,
          lastName: true,
          email: true,
          dni: true,
          phone: true,
          address: true,
          status: true,
          createdAt: true,
          branchId: true,
        },
        // orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      rows,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        lastName: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        branch: true,
        roles: {
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
          },
        },
      },
    });

    return ensureExists(user, id, "User");
  }

  async updateProfile(id: string, updateUserDto: UpdateUserDto) {
    const data: UpdateUserDto = { ...updateUserDto };
    if (updateUserDto.password) {
      data.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    const { roles, ...newData } = data;
    await this.prisma.user.update({
      where: { id },
      data: { ...newData },
    });
    if (roles && roles.length > 0) {
      await this.prisma.userRole.deleteMany({
        where: { userId: id },
      });

      await this.prisma.userRole.create({
        data: {
          userId: id,
          roleId: data.roles[0],
        },
      });
    }
    return "Datos actualizados correctamente";
  }

  async update(id: string, data: Omit<UpdateUserDto, "password">) {
    await this.prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id },
        data: {
          name: data.name,
          lastName: data.lastName,
          email: data.email,
          dni: data.dni,
          phone: data.phone,
          address: data.address,
          status: data.status,
          branchId: data.branchId,
        },
      });

      if (data.roles && data.roles.length > 0) {
        // borrar todos los roles actuales
        await tx.userRole.deleteMany({
          where: { userId: id },
        });

        // crear nuevo rol (solo uno)
        await tx.userRole.create({
          data: {
            userId: id,
            roleId: data.roles[0],
          },
        });
      }
    });
    return "Datos actualizados correctamente";
  }

  async remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
