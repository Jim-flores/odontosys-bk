import { IsDateString, IsOptional, IsString } from "class-validator";

export class CalendarQueryDto {
  @IsDateString()
  start: string;

  @IsDateString()
  end: string;

  @IsOptional()
  @IsString()
  userId?: string;
}
