import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { OdontogramsService } from "./odontograms.service";
import { Body, Controller, Param, Patch, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "@/common/guards/jwt-auth.guard";
import { Permissions } from "@/common/decorators/permissions.decorator";

@ApiTags("Odontograms")
@Controller("odontograms")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class OdontogramsController {
  constructor(private readonly odontogramsService: OdontogramsService) {}

  @Patch(":id")
  @Permissions("manage_odontograms")
  @ApiOperation({ summary: "Update odontogram" })
  patch(@Param("id") id: string, @Body() updateOdontogramDto: object) {
    return this.odontogramsService.patch(id, updateOdontogramDto);
  }
}
