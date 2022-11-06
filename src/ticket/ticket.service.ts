import { Injectable } from '@nestjs/common';
import { add } from 'date-fns';
import { PrismaService } from '../prisma/prisma.service';
import { PurchaseTicketDto, TicketDuration } from './dto';

@Injectable()
export class TicketService {
  constructor(private prisma: PrismaService) {}

  async getTickets(userId: number, activeOnly = false) {
    if (activeOnly) {
      return this.prisma.ticket.findMany({
        where: {
          userId,
          expireAt: {
            gte: new Date(Date.now()),
          },
        },
      });
    }

    return this.prisma.ticket.findMany({
      where: {
        userId,
      },
    });
  }

  async purchaseTicket(userId: number, purchaseTicket: PurchaseTicketDto) {
    const currentDate = new Date(Date.now());
    let ticketExpireAt: Date;

    switch (purchaseTicket.duration) {
      case TicketDuration.HOUR:
        ticketExpireAt = add(currentDate, { hours: 1 });
        break;
      case TicketDuration.DAY:
        ticketExpireAt = add(currentDate, { days: 1 });
        break;
      case TicketDuration.MONTH:
        ticketExpireAt = add(currentDate, { months: 1 });
        break;
    }

    return this.prisma.ticket.create({
      data: {
        userId,
        type: purchaseTicket.ticketType,
        expireAt: ticketExpireAt,
      },
    });
  }
}
