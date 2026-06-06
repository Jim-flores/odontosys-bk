import { IsString, IsOptional, IsUUID, IsEmail, IsEnum, IsInt, IsDateString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ClientStatus, Gender } from "@prisma/client";

export class CreateClientDto {
  @ApiProperty({ example: "Juan" })
  @IsString()
  name: string;

  @ApiProperty({ example: "Perez" })
  @IsString()
  lastName: string;

  @ApiProperty({ example: "71221134" })
  @IsString()
  dni: string;

  @ApiPropertyOptional({ example: "999999999" })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ enum: ClientStatus })
  @IsEnum(ClientStatus)
  status: ClientStatus;

  @ApiPropertyOptional({ example: "AV. Siempre Viva 123" })
  @IsOptional()
  @IsString()
  currentAddress?: string;

  @ApiPropertyOptional({ example: "client@example.com" })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: "uuid-of-branch" })
  @IsUUID()
  branchId: string;

  @ApiPropertyOptional({ example: "uuid-of-user" })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiProperty({ enum: Gender})
  @IsEnum(Gender)
  gender: Gender;

}

export class UpdateClientDto {
  @ApiPropertyOptional({ example: "Juan" })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: "Perez" })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional({ enum: ClientStatus })
  @IsOptional()
  @IsEnum(ClientStatus)
  status?: ClientStatus;

  @ApiPropertyOptional({ example: "12345678" })
  @IsOptional()
  @IsString()
  dni?: string;

  @ApiPropertyOptional({ enum: Gender })
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @ApiPropertyOptional({ example: "999999999" })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ example: "client@example.com" })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: "Av. Principal 123" })
  @IsOptional()
  @IsString()
  currentAddress?: string;

  @ApiPropertyOptional({ example: "1995-05-15" })
  @IsOptional()
  @IsDateString()
  birthDate?: string;

  @ApiPropertyOptional({ example: "Arequipa" })
  @IsOptional()
  @IsString()
  birthPlace?: string;

  @ApiPropertyOptional({ example: "Católica" })
  @IsOptional()
  @IsString()
  religion?: string;

  @ApiPropertyOptional({ example: "Soltero" })
  @IsOptional()
  @IsString()
  maritalStatus?: string;

  @ApiPropertyOptional({ example: "Ingeniero" })
  @IsOptional()
  @IsString()
  occupation?: string;

  @ApiPropertyOptional({ example: "Universitario" })
  @IsOptional()
  @IsString()
  grade?: string;

  @ApiPropertyOptional({ example: 30 })
  @IsOptional()
  @IsInt()
  age?: number;

  @ApiPropertyOptional({ example: "Arequipa" })
  @IsOptional()
  @IsString()
  dep?: string;

  @ApiPropertyOptional({ example: "Arequipa" })
  @IsOptional()
  @IsString()
  prov?: string;

  @ApiPropertyOptional({ example: "Cerro Colorado" })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({ example: "Dolor en molar superior" })
  @IsOptional()
  @IsString()
  chiefComplaint?: string;

  @ApiPropertyOptional({ example: "Notas adicionales" })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional({ example: "uuid-of-branch" })
  @IsOptional()
  @IsUUID()
  branchId?: string;

  @ApiPropertyOptional({ example: "uuid-of-user" })
  @IsOptional()
  @IsUUID()
  userId?: string;
}