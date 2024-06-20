import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Message } from '@prisma/client';
import { FrontMessageCreate } from '../contracts/front-message.interfaces';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {
  }

  async createMessage({ content, chatId, fileUrl, memberId }: FrontMessageCreate): Promise<Message | null> {
    return this.prisma.message.create({
      data: {
        content,
        fileUrl,
        chat: {
          connect: {
            id: chatId,
          },
        },
        member: {
          connect: {
            id: memberId,
          },
        },
      },
    });
  }

  async getMessagesByChatId(chatId: string): Promise<Message[] | null> {
    return this.prisma.message.findMany({
      where: {
        chatId,
      },
      include: {
        member: {
          include: {
            profile: true
          }
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
