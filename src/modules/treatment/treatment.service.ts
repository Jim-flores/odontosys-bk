import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";
import { CreateTreatmentDto, UpdateTreatmentDto } from "./dto/treatment.dto";
import { GetTreatmentsQuery } from "./dto/treatment-query.dto";
import { Prisma } from "@prisma/client";

@Injectable()
export class TreatmentService {
  constructor(private prisma: PrismaService) {}

  async create(createTreatmentDto: CreateTreatmentDto) {
    return this.prisma.treatment.create({
      data: createTreatmentDto,
    });
  }

  async findAll(query: GetTreatmentsQuery, userId: string, clientId: string) {
    const { page, pageSize, sortBy, status, sortOrder } = query;
    const where: Prisma.TreatmentWhereInput = {};

    if (userId) {
      where.userId = userId;
    }

    if (clientId) {
      where.clientId = clientId;
    }

    if (status && status.length > 0) {
      where.paymentStatus = { in: status };
    }

    let orderBy: Prisma.UserOrderByWithRelationInput = { createdAt: "desc" };
    if (sortBy) {
      orderBy = {
        [sortBy]: sortOrder ?? "asc",
      };
    }

    const [rows, total] = await this.prisma.$transaction([
      this.prisma.treatment.findMany({
        where,
        orderBy,
        select: {
          id: true,
          notes: true,
          paymentMethod: true,
          balance: true,
          paid: true,
          price: true,
          paymentStatus: true,
          createdAt: true,
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.treatment.count({ where }),
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

  async update(id: string, updateTreatmentDto: UpdateTreatmentDto) {
    return this.prisma.treatment.update({
      where: { id },
      data: updateTreatmentDto,
    });
  }

  async remove(id: string, userId: string, clientId: string) {
    return this.prisma.treatment.delete({
      where: { id, clientId, userId },
    });
  }
}
