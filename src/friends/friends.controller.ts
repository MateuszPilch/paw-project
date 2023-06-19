import { Controller, Req, Get, Delete, Body, Param, UseGuards, Patch} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FriendsService } from './friends.service';
import { FriendDto } from './dto/friend.dto';

@UseGuards(AuthGuard())
@Controller('friends')
export class FriendsController {
  constructor(private friendsService: FriendsService){}

  @Get(':nickname')
  async getFriendByNickname(@Param('nickname') nickname: string, @Req() req) {
    return this.friendsService.findByNickname(nickname, req.user);
  }

  @Get()
  async getFriendsList(@Req() req) {
    return this.friendsService.friendsList(req.user);
  }

  @Patch()
  async addFriend(@Body() friend: FriendDto, @Req() req): Promise<{ message: string }> {
    return this.friendsService.add(friend, req.user);
  }
  
  @Delete(':id')
  async deleteFriend(@Param('id') id: string, @Req() req): Promise<{ message: string }> {
    return this.friendsService.delete(id, req.user);
  }
}