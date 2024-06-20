import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Prisma } from '@prisma/client';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {
  }

  @Post()
  async create(@Body() createChatTypes: Prisma.ChatUncheckedCreateInput) {
    return this.chatService.create(createChatTypes);
  }

  @Get()
  async getAll() {
    return this.chatService.getAll();
  }

  @Post('join/:chanelId')
  async join(@Param('chanelId') chanelId: string, @Body() body: {profileId: string}) {
    return this.chatService.join(chanelId, body.profileId);
  }

  @Get('member')
  async getAllWithMember(@Query('profileId') profileId: string) {
    return this.chatService.getConnectedChats(profileId);
  }

  @Get('all')
  async getAllWithoutUser(@Query('profileId') profileId: string) {
    return this.chatService.getAllWithoutUser(profileId);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.chatService.getById(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.chatService.delete(id);
  }
}
