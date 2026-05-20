import { PrismaService } from "@/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { CreateAntecedentDto, UpdateAntecedentDto } from "./dto/antecedent.dto";

@Injectable()
export class AntecedentsService {
  constructor(private prisma: PrismaService) {}

  async findByClientId(clientId: string) {
    const response = await this.prisma.antecedent.findUnique({
      where: {
        clientId: clientId,
      },
    });
    return response;
  }

  async create(Dto: CreateAntecedentDto) {
    const response = await this.prisma.antecedent.create({
      data: {
        lastAppointment: Dto.lastAppointment,
        numberOfBrushesPerDay: Dto.numberOfBrushesPerDay,
        pain: Dto.pain,
        painDetails: Dto.painDetails,
        clench: Dto.clench,
        clenchDetails: Dto.clenchDetails,
        headache: Dto.headache,
        headacheDetails: Dto.headacheDetails,
        medication: Dto.medication,
        medicationDetails: Dto.medicationDetails,
        allergies: Dto.allergies,
        allergiesDetails: Dto.allergiesDetails,
        arthritis: Dto.arthritis,
        hypertension: Dto.hypertension,
        diabetes: Dto.diabetes,
        hemorrhage: Dto.hemorrhage,
        cardiovascular: Dto.cardiovascular,
        pregnancy: Dto.pregnancy,
        others: Dto.others,
        clientId: Dto.clientId,
      },
    });
    return response;
  }

  async update(clientId: string, Dto: UpdateAntecedentDto) {
    const response = await this.prisma.antecedent.update({
      where: {
        clientId: clientId,
      },
      data: {
        lastAppointment: Dto.lastAppointment,
        numberOfBrushesPerDay: Dto.numberOfBrushesPerDay,
        pain: Dto.pain,
        painDetails: Dto.painDetails,
        clench: Dto.clench,
        clenchDetails: Dto.clenchDetails,
        headache: Dto.headache,
        headacheDetails: Dto.headacheDetails,
        medication: Dto.medication,
        medicationDetails: Dto.medicationDetails,
        allergies: Dto.allergies,
        allergiesDetails: Dto.allergiesDetails,
        arthritis: Dto.arthritis,
        hypertension: Dto.hypertension,
        diabetes: Dto.diabetes,
        hemorrhage: Dto.hemorrhage,
        cardiovascular: Dto.cardiovascular,
        pregnancy: Dto.pregnancy,
        others: Dto.others,
      },
    });
    return response;
  }
}
