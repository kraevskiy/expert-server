import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ChatGateway } from './chat.gateway';
import { MessageService } from '../message/message.service';

@Module({
	imports: [PrismaModule],
	controllers: [ChatController],
	providers: [ChatService, ChatGateway, MessageService]
})
export class ChatModule {}
