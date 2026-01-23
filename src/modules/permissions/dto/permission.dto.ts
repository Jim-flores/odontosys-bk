import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePermissionDto {
  @ApiProperty({ example: 'manage_users' })
  @IsString()
  key: string;

  @ApiPropertyOptional({ example: 'Manage users permission' })
  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdatePermissionDto {
  @ApiPropertyOptional({ example: 'manage_users' })
  @IsOptional()
  @IsString()
  key?: string;

  @ApiPropertyOptional({ example: 'Manage users permission' })
  @IsOptional()
  @IsString()
  description?: string;
}
