import { IsOptional } from 'class-validator';

export class GetTicketsQueryDto {
  @IsOptional()
  active: boolean;
}
