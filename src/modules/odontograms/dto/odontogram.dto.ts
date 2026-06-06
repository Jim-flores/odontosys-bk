import { IsArray, IsOptional } from 'class-validator';
import { OdontogramChange } from '../types/odontogram.types';

export class UpdateOdontogramDto {
  @IsOptional()
  @IsArray()
  details?: OdontogramChange;
}