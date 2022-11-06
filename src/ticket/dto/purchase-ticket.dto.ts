import { TicketType } from '@prisma/client';
import { IsEnum, IsNotEmpty } from 'class-validator';

export enum TicketDuration {
  HOUR = 'HOUR',
  DAY = 'DAY',
  MONTH = 'MONTH',
}

export class PurchaseTicketDto {
  @IsEnum(TicketType)
  @IsNotEmpty()
  ticketType: TicketType;

  @IsEnum(TicketDuration)
  @IsNotEmpty()
  duration: TicketDuration;
}
