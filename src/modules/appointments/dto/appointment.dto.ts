import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { AppointmentStatus, AppointmentType } from "@prisma/client";
import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";

export class CreateAppointmentDto {
  @ApiProperty({ enum: AppointmentType })
  @IsEnum(AppointmentType)
  appointmentType: AppointmentType;

  @ApiPropertyOptional({ enum: AppointmentStatus })
  @IsOptional()
  @IsEnum(AppointmentStatus)
  status?: AppointmentStatus;

  @ApiPropertyOptional({ example: "Initial consultation" })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: "Patient reported mild discomfort" })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ example: "2026-06-08T15:00:00.000Z" })
  @IsDateString()
  startAt: string;

  @ApiProperty({ example: "2026-06-08T15:30:00.000Z" })
  @IsDateString()
  endAt: string;

  @ApiProperty({ example: "uuid-of-client" })
  @IsUUID()
  clientId: string;

  @ApiProperty({ example: "uuid-of-user" })
  @IsUUID()
  userId: string;

  @ApiProperty({ example: "uuid-of-branch" })
  @IsUUID()
  branchId: string;
}

export class UpdateAppointmentDto {
  @ApiPropertyOptional({ enum: AppointmentType })
  @IsOptional()
  @IsEnum(AppointmentType)
  appointmentType?: AppointmentType;

  @ApiPropertyOptional({ enum: AppointmentStatus })
  @IsOptional()
  @IsEnum(AppointmentStatus)
  status?: AppointmentStatus;

  @ApiPropertyOptional({ example: "Follow-up consultation" })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: "Updated appointment notes" })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional({ example: "2026-06-08T16:00:00.000Z" })
  @IsOptional()
  @IsDateString()
  startAt?: string;

  @ApiPropertyOptional({ example: "2026-06-08T16:30:00.000Z" })
  @IsOptional()
  @IsDateString()
  endAt?: string;

  @ApiPropertyOptional({ example: "uuid-of-client" })
  @IsOptional()
  @IsUUID()
  clientId?: string;

  @ApiPropertyOptional({ example: "uuid-of-user" })
  @IsOptional()
  @IsUUID()
  userId?: string;
}
