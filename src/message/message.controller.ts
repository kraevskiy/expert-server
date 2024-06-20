import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MessageService } from './message.service';
import { FrontMessageCreate } from '../contracts/front-message.interfaces';

@Controller('message')
export class MessageController {

  constructor(private readonly messageService: MessageService) {
  }

  @Post()
  async create(@Body() message: FrontMessageCreate) {
    return this.messageService.createMessage(message);
  }

  @Get('by-chat/:chatId')
  async getByChatId(@Param() params: { chatId: string }) {
    return this.messageService.getMessagesByChatId(params.chatId);
  }
}
