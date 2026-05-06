import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateClientDto, UpdateClientDto } from "./dto/client.dto";
import { ensureExists } from "../../common/utils/error-utils";
import { Prisma } from "@prisma/client";
import { GetClientsQuery } from "./dto/client-query.dto";

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}

  async create(createClientDto: CreateClientDto) {
    await this.prisma.client.create({
      data: {
        name: createClientDto.name,
        lastName: createClientDto.lastName,
        dni: createClientDto.dni,
        phone: createClientDto.phone,
        email: createClientDto.email,
        notes: createClientDto.notes,
        branchId: createClientDto.branchId,
        userId: createClientDto.userId,
      },
    });
    return "Cliente creado exitosamente";
  }

  async findAll(query: GetClientsQuery) {
    const { page, pageSize, search, sortBy, status, sortOrder } = query;
    const where: Prisma.ClientWhereInput = {};
    if (status && status.length > 0) {
      where.status = { in: status };
    }
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { lastName: { contains: search, mode: "insensitive" } },
        { dni: { contains: search, mode: "insensitive" } },
      ];
    }
    let orderBy: Prisma.ClientOrderByWithRelationInput = { createdAt: "desc" };
    if (sortBy) {
      orderBy = {
        [sortBy]: sortOrder ?? "asc",
      };
    }
    const [rows, total] = await this.prisma.$transaction([
      this.prisma.client.findMany({
        where,
        orderBy,
        select: {
          id: true,
          name: true,
          lastName: true,
          dni: true,
          email: true,
          phone: true,
          createdAt: true,
          branchId: true,
          userId: true,
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.client.count({ where }),
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
    // Por determinar
    const client = await this.prisma.client.findUnique({
      where: { id },
      include: {
        branch: true,
        user: true,
      },
    });

    return ensureExists(client, id, "Client");
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    try {
      await this.prisma.client.update({
        where: { id },
        data: updateClientDto,
        include: {
          branch: true,
          user: true,
        },
      });
      return "Datos actualizados correctamente";
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        ensureExists(null, id, "Client");
      }
      throw error;
    }
  }

  async remove(id: string) {
    await this.prisma.client.delete({
      where: { id },
    });
    return "Cliente eliminado correctamente";
  }
}
