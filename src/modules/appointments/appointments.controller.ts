import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Permissions } from "../../common/decorators/permissions.decorator";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { AppointmentsService } from "./appointments.service";
import {
  CreateAppointmentDto,
  UpdateAppointmentDto,
} from "./dto/appointment.dto";
import { GetAppointmentsQuery } from "./dto/appointment-query.dto";
import { CalendarQueryDto } from "./dto/calendar-query.dto";

@ApiTags("Appointments")
@Controller("appointments")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  @Permissions("manage_appointments")
  @ApiOperation({ summary: "Create a new appointment" })
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @Get()
  @Permissions("manage_appointments", "view_appointments")
  @ApiOperation({ summary: "Get all appointments" })
  findAll(@Query() query: GetAppointmentsQuery) {
    return this.appointmentsService.findAll(query);
  }

  @Get(":id")
  @Permissions("manage_appointments", "view_appointments")
  @ApiOperation({ summary: "Get appointment by ID" })
  findOne(@Param("id") id: string) {
    return this.appointmentsService.findOne(id);
  }

  @Patch(":id")
  @Permissions("manage_appointments")
  @ApiOperation({ summary: "Update appointment" })
  update(
    @Param("id") id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentsService.update(id, updateAppointmentDto);
  }

  @Delete(":id")
  @Permissions("manage_appointments")
  @ApiOperation({ summary: "Delete appointment" })
  remove(@Param("id") id: string) {
    return this.appointmentsService.remove(id);
  }
  // Calendar 
  @Get("calendar")
  @Permissions("manage_appointments", "view_appointments")
  @ApiOperation({ summary: "Get appointments for calendar view" })
  findCalendar(@Query() query: CalendarQueryDto) {
    return this.appointmentsService.findCalendar(query);
  }

  @Patch(":id/move")
  @Permissions("manage_appointments")
  @ApiOperation({ summary: "Move appointment to a new time" })
  move(
    @Param("id") id: string,
    @Body() dto: CalendarQueryDto,
  ) {
    return this.appointmentsService.move(id, dto);
  }
}
