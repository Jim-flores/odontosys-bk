import {
  IsString,
  IsEmail,
  IsOptional,
  IsUUID,
  MinLength,
  IsEnum,
  IsObject,
  IsArray,
  Length,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { UserStatus } from "@prisma/client";

export class CreateUserDto {
  @ApiProperty({ example: "John" })
  @IsString()
  name: string;

  @ApiProperty({ example: "Doe" })
  @IsString()
  lastName: string;

  @ApiProperty({ example: "john@example.com" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "71123456" })
  @IsString()
  @Length(8)
  dni: string;

  @ApiProperty({ example: "987654321" })
  @IsString()
  @Length(9)
  phone: string;

  @ApiProperty({ example: "Av. Los alamos 123" })
  @IsString()
  @IsOptional()
  address: string;

  @ApiProperty({ example: "password123", minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ enum: UserStatus })
  @IsEnum(UserStatus)
  status: UserStatus;

  @ApiProperty({ example: "uuid-of-branch" })
  @IsUUID()
  branchId: string;

  @ApiProperty({ example: ["uuid-of-role-1", "uuid-of-role-2"] })
  @IsObject()
  roles: string[];
}

export class UpdateUserDto {
  @ApiPropertyOptional({ example: "John" })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: "Doe" })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional({ example: "john@example.com" })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: "71123456" })
  @IsString()
  @Length(8)
  dni: string;

  @ApiPropertyOptional({ example: "987654321" })
  @IsString()
  @Length(9)
  phone: string;

  @ApiPropertyOptional({ example: "Av. Los alamos 123" })
  @IsString()
  @IsOptional()
  address: string;

  @ApiPropertyOptional({ enum: UserStatus })
  @IsEnum(UserStatus)
  status: UserStatus;

  @ApiPropertyOptional({ example: "password123", minLength: 6 })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @ApiPropertyOptional({ example: "uuid-of-branch" })
  @IsOptional()
  @IsUUID()
  branchId?: string;

  @ApiPropertyOptional({ example: ["uuid-of-role"] })
  @IsOptional()
  @IsArray()
  roles: string[];
}
