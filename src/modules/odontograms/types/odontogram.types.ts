export type ToothSurface =
  | 'M'
  | 'D'
  | 'V'
  | 'L'
  | 'O'
  | 'I';

export type ToothCondition =
  | 'CARIES'
  | 'CROWN'
  | 'EXTRACTION'
  | 'IMPLANT'
  | 'FRACTURE'
  | 'RESIN'
  | 'ENDO'
  | 'MISSING'
  | 'SEALANT';

export interface ToothRecord {
  tooth: string;
  surfaces?: Partial<Record<ToothSurface, ToothCondition[]>>;
  conditions?: ToothCondition[];
}

export type OdontogramChange = ToothRecord[];