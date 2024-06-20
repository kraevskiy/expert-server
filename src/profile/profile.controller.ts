import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Prisma, Profile } from '@prisma/client';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {

  constructor(private readonly profileService: ProfileService) {
  }

  @Post()
  async create(@Body() profile: Prisma.ProfileCreateInput): Promise<Profile | null> {
    return this.profileService.create(profile);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Profile | null> {
    return this.profileService.getById(id);
  }
}
