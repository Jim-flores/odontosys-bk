import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  // Delete,
  UseGuards,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { CompaniesService } from "./companies.service";
import { CreateCompanyDto, UpdateCompanyDto } from "./dto/company.dto";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { Permissions } from "../../common/decorators/permissions.decorator";
import { Public } from "../../common/decorators/public.decorator";

@ApiTags("Companies")
@Controller("companies")
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}
  
  @Public()
  @Get('actual')
  @ApiOperation({ summary: "Get the current company's data" })
  getActualCompany() {
    return this.companiesService.getActualCompany();
  }

  @Post()
  @Permissions("manage_company")
  @ApiOperation({ summary: "Create a new company" })
  @ApiBearerAuth()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.create(createCompanyDto);
  }

  @Get()
  @Permissions("manage_company")
  @ApiOperation({ summary: "Get all companies" })
  @ApiBearerAuth()
  findAll() {
    return this.companiesService.findAll();
  }

  @Get(":id")
  @Permissions("manage_company")
  @ApiOperation({ summary: "Get company by ID" })
  @ApiBearerAuth()
  findOne(@Param("id") id: string) {
    return this.companiesService.findOne(id);
  }


  @Patch('actual')
  @Permissions('manage_company')
  @ApiOperation({ summary: "Update the current company's data" })
  @ApiBearerAuth()
  async updateActualCompany(@Body() updateCompanyDto: UpdateCompanyDto) {
    const company = await this.companiesService.getActualCompany();
    return this.companiesService.update(company.id, updateCompanyDto);
  }

  @Patch(':id')
  @Permissions('manage_company')
  @ApiOperation({ summary: 'Update company' })
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) { 
    return this.companiesService.update(id, updateCompanyDto);
  }


  // @Delete(":id")
  // @Permissions("manage_company")
  // @ApiOperation({ summary: "Delete company" })
  // @ApiBearerAuth()
  // remove(@Param("id") id: string) {
  //   return this.companiesService.remove(id);
  // }
}
