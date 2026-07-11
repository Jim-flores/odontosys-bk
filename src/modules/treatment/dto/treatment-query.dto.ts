import { PaymentStatus } from "@prisma/client";
import { Transform, Type } from "class-transformer";
import { IsOptional, IsInt, Min, IsString, IsEnum } from "class-validator";

export class GetTreatmentsQuery {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageSize?: number = 10;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === "string") {
      return value.split(",").map((v) => v.trim());
    }
  })
  @IsEnum(PaymentStatus, { each: true })
  status?: PaymentStatus[];

  @IsOptional()
  sortBy?: string;

  @IsOptional()
  @IsEnum(["asc", "desc"])
  sortOrder?: "asc" | "desc";

  @IsString()
  userId: string;

  @IsString()
  clientId: string;
}
