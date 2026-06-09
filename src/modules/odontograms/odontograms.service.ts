import { PrismaService } from "@/prisma/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class OdontogramsService {
  constructor(private prisma: PrismaService) {}

  async patch(id: string, dto: object) {
    const response = await this.prisma.odontogram.update({
      where: {
        clientId: id,
      },
      data: {
        ...dto,
      },
    });
    return response;
  }
}
