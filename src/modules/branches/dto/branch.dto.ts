import { IsString, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBranchDto {
  @ApiProperty({ example: 'Main Branch' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: '123 Main Street' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ example: '999999999' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ example: 'uuid-of-company' })
  @IsUUID()
  companyId: string;
}

export class UpdateBranchDto {
  @ApiPropertyOptional({ example: 'Main Branch' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: '123 Main Street' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ example: '999999999' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ example: 'uuid-of-company' })
  @IsOptional()
  @IsUUID()
  companyId?: string;
}
