import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateClientDto, UpdateClientDto } from './dto/client.dto';
import { ensureExists } from '../../common/utils/error-utils';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}

  async create(createClientDto: CreateClientDto) {
    return this.prisma.client.create({
      data: {
        name: createClientDto.name,
        lastName: createClientDto.lastName,
        phone: createClientDto.phone,
        email: createClientDto.email,
        notes: createClientDto.notes,
        branchId: createClientDto.branchId,
        userId: createClientDto.userId,
      },
      include: {
        branch: true,
        user: true,
      },
    });
  }

  async findAll() {
    return this.prisma.client.findMany({
      include: {
        branch: true,
        user: true,
      },
    });
  }

  async findOne(id: string) {
    const client = await this.prisma.client.findUnique({
      where: { id },
      include: {
        branch: true,
        user: true,
      },
    });

    return ensureExists(client, id, 'Client');
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    try {
      return await this.prisma.client.update({
        where: { id },
        data: updateClientDto,
        include: {
          branch: true,
          user: true,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        ensureExists(null, id, 'Client');
      }
      throw error;
    }
  }

  async remove(id: string) {
    return this.prisma.client.delete({
      where: { id },
    });
  }
}
