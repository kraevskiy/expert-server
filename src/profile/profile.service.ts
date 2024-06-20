import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Profile } from '@prisma/client';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {
  }

  async create(profile: Prisma.ProfileCreateInput): Promise<Profile | null> {
    return this.prisma.profile.create({
      data: profile,
    });
  }

  async getById(id: string): Promise<Profile | null> {
    return this.prisma.profile.findUnique({
      where: {
        id,
      },
      include: {
        members: true,
        chats: true,
      },
    });
  }
}
