import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { MessageService } from '../message/message.service';

@WebSocketGateway({
  namespace: '/socket',
})
export class ChatGateway implements OnGatewayInit {
  @WebSocketServer() wss: Server;
  private readonly logger = new Logger(ChatGateway.name);

  constructor(private readonly messageService: MessageService) {
  }

  afterInit() {
    this.logger.log('Initialized');
  }

  @SubscribeMessage('joinToChat')
  async joinToChat(client: Socket, data: { chatId: string; }) {
    client.join(data.chatId);
    client.emit('joinedToChat', data.chatId);
  }

  @SubscribeMessage('messageToServer')
  async handleMessage(client: Socket, data: { chatId: string; content: string; fileUrl?: string; memberId: string }) {
    await this.messageService.createMessage(data);
    this.wss.to(data.chatId).emit('newMessage')
  }
}
