import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from "class-validator";

export class CreateAntecedentDto {
  @ApiPropertyOptional({
    example: "2026-05-10",
    description: "Fecha de la última cita odontológica",
  })
  @IsOptional()
  @IsString()
  lastAppointment?: string;

  @ApiPropertyOptional({
    example: 3,
    description: "Número de cepillados por día",
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  numberOfBrushesPerDay?: number;

  @ApiProperty({
    example: true,
    description: "Indica si el paciente presenta dolor",
  })
  @IsBoolean()
  pain: boolean;

  @ApiPropertyOptional({
    example: "Dolor en molares inferiores",
    description: "Detalles del dolor",
  })
  @IsOptional()
  @IsString()
  painDetails?: string;

  @ApiProperty({
    example: false,
    description: "Indica si el paciente aprieta los dientes",
  })
  @IsBoolean()
  clench: boolean;

  @ApiPropertyOptional({
    example: "Sucede principalmente durante el sueño",
    description: "Detalles sobre el bruxismo o apretamiento dental",
  })
  @IsOptional()
  @IsString()
  clenchDetails?: string;

  @ApiProperty({
    example: true,
    description: "Indica si el paciente presenta dolores de cabeza",
  })
  @IsBoolean()
  headache: boolean;

  @ApiPropertyOptional({
    example: "Migrañas frecuentes",
    description: "Detalles sobre los dolores de cabeza",
  })
  @IsOptional()
  @IsString()
  headacheDetails?: string;

  @ApiProperty({
    example: false,
    description: "Indica si el paciente consume medicamentos",
  })
  @IsBoolean()
  medication: boolean;

  @ApiPropertyOptional({
    example: "Ibuprofeno",
    description: "Detalles de la medicación",
  })
  @IsOptional()
  @IsString()
  medicationDetails?: string;

  @ApiProperty({
    example: true,
    description: "Indica si el paciente tiene alergias",
  })
  @IsBoolean()
  allergies: boolean;

  @ApiPropertyOptional({
    example: "Alergia a la penicilina",
    description: "Detalles de las alergias",
  })
  @IsOptional()
  @IsString()
  allergiesDetails?: string;

  @ApiProperty({
    example: false,
    description: "Indica si el paciente tiene artritis",
  })
  @IsBoolean()
  arthritis: boolean;

  @ApiProperty({
    example: false,
    description: "Indica si el paciente tiene hipertensión",
  })
  @IsBoolean()
  hypertension: boolean;

  @ApiProperty({
    example: false,
    description: "Indica si el paciente tiene diabetes",
  })
  @IsBoolean()
  diabetes: boolean;

  @ApiProperty({
    example: false,
    description: "Indica si el paciente presenta hemorragias",
  })
  @IsBoolean()
  hemorrhage: boolean;

  @ApiProperty({
    example: false,
    description: "Indica si el paciente tiene enfermedades cardiovasculares",
  })
  @IsBoolean()
  cardiovascular: boolean;

  @ApiProperty({
    example: false,
    description: "Indica si la paciente está embarazada",
  })
  @IsBoolean()
  pregnancy: boolean;

  @ApiPropertyOptional({
    example: "Otra información médica relevante",
    description: "Observaciones adicionales",
  })
  @IsOptional()
  @IsString()
  others?: string;

  @ApiProperty({ example: "uuid-of-client" })
  @IsUUID()
  clientId: string;
}
export class UpdateAntecedentDto {
  @ApiPropertyOptional({
    example: "2026-05-10",
    description: "Fecha de la última cita odontológica",
  })
  @IsOptional()
  @IsString()
  lastAppointment?: string;

  @ApiPropertyOptional({
    example: 3,
    description: "Número de cepillados por día",
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  numberOfBrushesPerDay?: number;

  @ApiPropertyOptional({
    example: true,
    description: "Indica si el paciente presenta dolor",
  })
  @IsOptional()
  @IsBoolean()
  pain?: boolean;

  @ApiPropertyOptional({
    example: "Dolor en molares inferiores",
    description: "Detalles del dolor",
  })
  @IsOptional()
  @IsString()
  painDetails?: string;

  @ApiPropertyOptional({
    example: false,
    description: "Indica si el paciente aprieta los dientes",
  })
  @IsOptional()
  @IsBoolean()
  clench?: boolean;

  @ApiPropertyOptional({
    example: "Sucede principalmente durante el sueño",
    description: "Detalles sobre el bruxismo o apretamiento dental",
  })
  @IsOptional()
  @IsString()
  clenchDetails?: string;

  @ApiPropertyOptional({
    example: true,
    description: "Indica si el paciente presenta dolores de cabeza",
  })
  @IsOptional()
  @IsBoolean()
  headache?: boolean;

  @ApiPropertyOptional({
    example: "Migrañas frecuentes",
    description: "Detalles sobre los dolores de cabeza",
  })
  @IsOptional()
  @IsString()
  headacheDetails?: string;

  @ApiPropertyOptional({
    example: false,
    description: "Indica si el paciente consume medicamentos",
  })
  @IsOptional()
  @IsBoolean()
  medication?: boolean;

  @ApiPropertyOptional({
    example: "Ibuprofeno",
    description: "Detalles de la medicación",
  })
  @IsOptional()
  @IsString()
  medicationDetails?: string;

  @ApiPropertyOptional({
    example: true,
    description: "Indica si el paciente tiene alergias",
  })
  @IsOptional()
  @IsBoolean()
  allergies?: boolean;

  @ApiPropertyOptional({
    example: "Alergia a la penicilina",
    description: "Detalles de las alergias",
  })
  @IsOptional()
  @IsString()
  allergiesDetails?: string;

  @ApiPropertyOptional({
    example: false,
    description: "Indica si el paciente tiene artritis",
  })
  @IsOptional()
  @IsBoolean()
  arthritis?: boolean;

  @ApiPropertyOptional({
    example: false,
    description: "Indica si el paciente tiene hipertensión",
  })
  @IsOptional()
  @IsBoolean()
  hypertension?: boolean;

  @ApiPropertyOptional({
    example: false,
    description: "Indica si el paciente tiene diabetes",
  })
  @IsOptional()
  @IsBoolean()
  diabetes?: boolean;  

  @ApiPropertyOptional({
    example: false,
    description: "Indica si el paciente presenta hemorragias",
  })
  @IsOptional()
  @IsBoolean()
  hemorrhage?: boolean;

  @ApiPropertyOptional({
    example: false,
    description: "Indica si el paciente tiene enfermedades cardiovasculares",
  })
  @IsOptional()
  @IsBoolean()
  cardiovascular?: boolean;

  @ApiPropertyOptional({
    example: false,
    description: "Indica si la paciente está embarazada",
  })
  @IsOptional()
  @IsBoolean()
  pregnancy?: boolean;

  @ApiPropertyOptional({
    example: "Otra información médica relevante",
    description: "Observaciones adicionales",
  })
  @IsOptional()
  @IsString()
  others?: string;
}