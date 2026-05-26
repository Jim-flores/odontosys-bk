import { JwtAuthGuard } from "@/common/guards/jwt-auth.guard";
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AntecedentsService } from "./antecedents.service";
import { CreateAntecedentDto } from "./dto/antecedent.dto";

@ApiTags("Antecedents")
@Controller("antecedents")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AntecedentsController {
  constructor(private readonly antecedentsService: AntecedentsService) {}

  @Get(":clientId")
  @ApiOperation({ summary: "Get antecedents by client ID" })
  findByClientId(@Param("clientId") clientId: string) {
    return this.antecedentsService.findByClientId(clientId);
  }

  @Post()
  @ApiOperation({ summary: "Create antecedents" })
  create(@Body() createAntecedentDto: CreateAntecedentDto) {
    return this.antecedentsService.create(createAntecedentDto);
  }

  @Patch(":clientId")
  @ApiOperation({ summary: "Update antecedents by client ID" })
  update(
    @Param("clientId") clientId: string,
    @Body() updateAntecedentDto: CreateAntecedentDto,
  ) {
    return this.antecedentsService.update(clientId, updateAntecedentDto);
  }
}
