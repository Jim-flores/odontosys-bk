import { BadRequestException, Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { ensureExists } from "../../common/utils/error-utils";
import { PrismaService } from "../../prisma/prisma.service";
import { GetAppointmentsQuery } from "./dto/appointment-query.dto";
import {
  CreateAppointmentDto,
  UpdateAppointmentDto,
} from "./dto/appointment.dto";
import { CalendarQueryDto } from "./dto/calendar-query.dto";

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    this.validateAppointmentRange(
      createAppointmentDto.startAt,
      createAppointmentDto.endAt,
    );

    return this.prisma.appointment.create({
      data: {
        appointmentType: createAppointmentDto.appointmentType,
        status: createAppointmentDto.status,
        title: createAppointmentDto.title,
        notes: createAppointmentDto.notes,
        startAt: new Date(createAppointmentDto.startAt),
        endAt: new Date(createAppointmentDto.endAt),
        clientId: createAppointmentDto.clientId,
        userId: createAppointmentDto.userId,
        branchId: createAppointmentDto.branchId,
      },
      include: this.defaultInclude,
    });
  }

  async findAll(query: GetAppointmentsQuery) {
    const {
      page,
      pageSize,
      search,
      sortBy,
      sortOrder,
      status,
      appointmentType,
      clientId,
      userId,
      startFrom,
      startTo,
    } = query;

    const where: Prisma.AppointmentWhereInput = {};

    if (status && status.length > 0) {
      where.status = { in: status };
    }

    if (appointmentType && appointmentType.length > 0) {
      where.appointmentType = { in: appointmentType };
    }

    if (clientId) {
      where.clientId = clientId;
    }

    if (userId) {
      where.userId = userId;
    }

    if (startFrom || startTo) {
      where.startAt = {
        ...(startFrom ? { gte: new Date(startFrom) } : {}),
        ...(startTo ? { lte: new Date(startTo) } : {}),
      };
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { notes: { contains: search, mode: "insensitive" } },
        { client: { name: { contains: search, mode: "insensitive" } } },
        { client: { lastName: { contains: search, mode: "insensitive" } } },
        { user: { name: { contains: search, mode: "insensitive" } } },
        { user: { lastName: { contains: search, mode: "insensitive" } } },
      ];
    }

    let orderBy: Prisma.AppointmentOrderByWithRelationInput = {
      startAt: "desc",
    };
    if (sortBy) {
      orderBy = {
        [sortBy]: sortOrder ?? "asc",
      };
    }

    const [rows, total] = await this.prisma.$transaction([
      this.prisma.appointment.findMany({
        where,
        orderBy,
        select: this.listSelect,
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.appointment.count({ where }),
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
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
      include: this.defaultInclude,
    });

    return ensureExists(appointment, id, "Appointment");
  }

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    const currentAppointment = await this.prisma.appointment.findUnique({
      where: { id },
      select: {
        startAt: true,
        endAt: true,
      },
    });

    ensureExists(currentAppointment, id, "Appointment");

    this.validateAppointmentRange(
      updateAppointmentDto.startAt,
      updateAppointmentDto.endAt,
      currentAppointment.startAt,
      currentAppointment.endAt,
    );

    await this.prisma.appointment.update({
      where: { id },
      data: {
        appointmentType: updateAppointmentDto.appointmentType,
        status: updateAppointmentDto.status,
        title: updateAppointmentDto.title,
        notes: updateAppointmentDto.notes,
        startAt: updateAppointmentDto.startAt
          ? new Date(updateAppointmentDto.startAt)
          : undefined,
        endAt: updateAppointmentDto.endAt
          ? new Date(updateAppointmentDto.endAt)
          : undefined,
        clientId: updateAppointmentDto.clientId,
        userId: updateAppointmentDto.userId,
      },
    });

    return "Datos actualizados correctamente";
  }

  async remove(id: string) {
    await this.prisma.appointment.delete({
      where: { id },
    });
    return "Cita eliminada correctamente";
  }

  private validateAppointmentRange(
    startAt?: string,
    endAt?: string,
    currentStartAt?: Date,
    currentEndAt?: Date,
  ) {
    const start = startAt ? new Date(startAt) : currentStartAt;
    const end = endAt ? new Date(endAt) : currentEndAt;

    if (start && end && end <= start) {
      throw new BadRequestException("endAt must be greater than startAt");
    }
  }

  private readonly listSelect = {
    id: true,
    appointmentType: true,
    status: true,
    title: true,
    notes: true,
    startAt: true,
    endAt: true,
    createdAt: true,
    updatedAt: true,
    clientId: true,
    userId: true,
    client: {
      select: {
        id: true,
        name: true,
        lastName: true,
        dni: true,
      },
    },
    user: {
      select: {
        id: true,
        name: true,
        lastName: true,
        email: true,
      },
    },
  } satisfies Prisma.AppointmentSelect;

  private readonly defaultInclude = {
    client: true,
    user: true,
  } satisfies Prisma.AppointmentInclude;

  // Calendar
  async findCalendar(query: CalendarQueryDto) {
    const appointments = await this.prisma.appointment.findMany({
      where: {
        startAt: {
          gte: new Date(query.start),
          lte: new Date(query.end),
        },
      },
      include: {
        client: {
          select: {
            id: true,
            name: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        startAt: "asc",
      },
    });

    return appointments.map((appointment) => ({
      id: appointment.id,
      title: `${appointment.client.name} ${appointment.client.lastName}`,
      start: appointment.startAt,
      end: appointment.endAt,

      extendedProps: {
        status: appointment.status,
        appointmentType: appointment.appointmentType,
        clientId: appointment.clientId,
        userId: appointment.userId,
      },
    }));
  }
  async move(id: string, dto: CalendarQueryDto) {
    return this.prisma.appointment.update({
      where: {
        id,
      },
      data: {
        startAt: new Date(dto.start),
        endAt: new Date(dto.end),
      },
    });
  }
}
