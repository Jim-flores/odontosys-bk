import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { TreatmentService } from "./treatment.service";
import { CreateTreatmentDto, UpdateTreatmentDto } from "./dto/treatment.dto";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { Permissions } from "../../common/decorators/permissions.decorator";
import { GetTreatmentsQuery } from "./dto/treatment-query.dto";

@ApiTags("Treatments")
@Controller("treatments")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TreatmentController {
  constructor(private readonly treatmentService: TreatmentService) {}

  @Post()
  @Permissions("manage_clients")
  @ApiOperation({ summary: "Create a new treatment" })
  create(@Body() createTreatmentDto: CreateTreatmentDto) {
    return this.treatmentService.create(createTreatmentDto);
  }

  @Get()
  @Permissions("manage_clients", "view_clients")
  @ApiOperation({ summary: "Get all treatments" })
  findAll(@Query() query: GetTreatmentsQuery) {
    return this.treatmentService.findAll(query, query.userId, query.clientId);
  }

  @Patch(":id")
  @Permissions("manage_clients")
  @ApiOperation({ summary: "Update treatment" })
  update(
    @Param("id") id: string,
    @Body() updateTreatmentDto: UpdateTreatmentDto,
  ) {
    return this.treatmentService.update(id, updateTreatmentDto);
  }

  @Delete(":id")
  @Permissions("manage_clients")
  @ApiOperation({ summary: "Delete treatment" })
  remove(@Param("id") id: string, @Query("userId") userId: string, @Query("clientId") clientId: string) {
    return this.treatmentService.remove(id, userId, clientId);
  }
}
