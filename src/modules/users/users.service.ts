import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { CreateUserDto, UpdateUserDto } from "./dto/user.dto";
import { ensureExists } from "../../common/utils/error-utils";
import { GetUsersQuery } from "./dto/user-query.dto";
import { Prisma } from "@prisma/client";

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
        password: hashedPassword,
        branchId: createUserDto.branchId,
      },
    });
    // Solo el primer rol
    await this.prisma.userRole.create({
      data: {
        userId: user.id,
        roleId: createUserDto.roles[0]
      }
    })
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
          status: true,
          createdAt: true,
          branch: {
            select: {
              name: true,
            },
          },
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

  async update(id: string, updateUserDto: UpdateUserDto) {
    const data: any = { ...updateUserDto };

    if (updateUserDto.password) {
      data.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    try {
      return await this.prisma.user.update({
        where: { id },
        data,
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
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        ensureExists(null, id, "User");
      }
      throw error;
    }
  }

  async remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
