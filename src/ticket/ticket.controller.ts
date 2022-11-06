import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { GetTicketsQueryDto, PurchaseTicketDto } from './dto';
import { TicketService } from './ticket.service';

@UseGuards(JwtGuard)
@Controller('tickets')
export class TicketController {
  constructor(private ticketService: TicketService) {}

  @Get()
  getTickets(
    @GetUser('id') userId: number,
    @Query() query: GetTicketsQueryDto,
  ) {
    return this.ticketService.getTickets(userId, query.active);
  }

  @Post()
  purchaseTicket(
    @Body() purchaseTicket: PurchaseTicketDto,
    @GetUser('id') userId: number,
  ) {
    return this.ticketService.purchaseTicket(userId, purchaseTicket);
  }
}
