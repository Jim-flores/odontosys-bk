import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateBranchDto, UpdateBranchDto } from "./dto/branch.dto";
import { ensureExists } from "../../common/utils/error-utils";
import { Prisma } from "@prisma/client";
import { GetBranchQuery } from "./dto/branch-query.dto";

@Injectable()
export class BranchesService {
  constructor(private prisma: PrismaService) {}

  async create(createBranchDto: CreateBranchDto) {
    return this.prisma.branch.create({
      data: {
        name: createBranchDto.name,
        address: createBranchDto.address,
        phone: createBranchDto.phone,
        companyId: createBranchDto.companyId,
      },
      include: {
        company: true,
        users: true,
        clients: true,
      },
    });
  }
  async listBranches(query: GetBranchQuery) {
    const { page, pageSize } = query;
    const [rows, total] = await this.prisma.$transaction([
      this.prisma.branch.findMany({
        select: {
          id: true,
          name: true,
          address: true,
          phone: true,
          createdAt: true,
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.branch.count()
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
  async findAll() {
    return this.prisma.branch.findMany({
      include: {
        company: true,
        users: true,
        clients: true,
      },
    });
  }

  async findOne(id: string) {
    const branch = await this.prisma.branch.findUnique({
      where: { id },
      include: {
        company: true,
        users: true,
        clients: true,
      },
    });

    return ensureExists(branch, id, "Branch");
  }

  async update(id: string, updateBranchDto: UpdateBranchDto) {
    try {
      return await this.prisma.branch.update({
        where: { id },
        data: updateBranchDto,
        include: {
          company: true,
          users: true,
          clients: true,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        ensureExists(null, id, "Branch");
      }
      throw error;
    }
  }

  async remove(id: string) {
    return this.prisma.branch.delete({
      where: { id },
    });
  }
}
