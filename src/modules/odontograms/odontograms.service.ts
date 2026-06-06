import { PrismaService } from "@/prisma/prisma.service";

export class OdontogramsService {
  constructor(private prisma: PrismaService) {}
  async patch(id: string, dto: object) {
    const response = await this.prisma.odontogram.update({
      where: {
        clientId: id,
      },
      data: {
        details: dto,
      },
    });
    return response;
  }
}
