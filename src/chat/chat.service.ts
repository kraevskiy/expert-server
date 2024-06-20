import { Injectable } from '@nestjs/common';
import { Chat, Member, Prisma, Profile } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {
  }

  async create(chat: Prisma.ChatUncheckedCreateInput): Promise<Chat | null> {
    return this.prisma.chat.create({
      data: {
        name: chat.name,
        messages: {
          create: [],
        },
        profile: {
          connect: {
            id: chat.profileId,
          },
        },
        members: {
          create: [
            {
              profileId: chat.profileId,
            },
          ],
        },
      },
    });
  }

  async getAll(): Promise<Chat[] | null> {
    return this.prisma.chat.findMany({
      include: {
        members: true,
        messages: true
      }
    })
  }

  async join(chatId: string, profileId: string): Promise<Chat | null> {
    return this.prisma.chat.update({
      where: {
        id: chatId,
      },
      data: {
        members: {
          create: {
            profileId,
          },
        },
      },
    });
  }


  async getById(id: string): Promise<Chat | null> {
    return this.prisma.chat.findFirst({
      where: {
        id,
      },
      include: {
        members: true,
        // messages: true,
      }
    });
  }

  async delete(id: string): Promise<Chat | null> {
    return this.prisma.chat.delete({
      where: {
        id,
      },
    });
  }


  async getConnectedChats(profileId: string): Promise<Chat[] | null> {
    return this.prisma.chat.findMany({
      where: {
        profileId: {
          not: {
            equals: profileId,
          },
        },
        members: {
          some: {
            profileId: {
              equals: profileId,
            },
          },
        },
      },
    });
  }

  async getAllWithoutUser(profileId: string): Promise<Chat[] | null> {
    return this.prisma.chat.findMany({
      where: {
        NOT: [
          {
            profileId: {
              equals: profileId,
            },
          },
          {
            members: {
              some: {
                profileId: {
                  equals: profileId,
                },
              },
            },
          },
        ],
      },
    });
  }
}
