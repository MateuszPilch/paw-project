import { Controller, Req, Get, Delete, Body, Param, UseGuards, Patch} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FriendsService } from './friends.service';
import { Friend } from './schemas/friend.schema';
import { UserDto } from 'src/auth/dto/user.dto';

@UseGuards(AuthGuard())
@Controller('friends')
export class FriendsController {
  constructor(private friendsService: FriendsService){}

  @Get(':nickname')
  async getFriendByNickname(@Param('nickname') nickname: string, @Req() req): Promise<Friend[]> {
    return this.friendsService.findByNickname(nickname, req.user);
  }

  @Get()
  async getFriendsList(@Req() req){
    return this.friendsService.friendsList(req.user);
  }

  @Patch()
  async addFriend(@Body() friend: UserDto, @Req() req): Promise<{ message: string }> {
    return this.friendsService.add(friend, req.user);
  }
  
  @Delete()
  async deleteFriend(@Body() friend: UserDto, @Req() req): Promise<{ message: string }> {
    return this.friendsService.delete(friend, req.user);
  }
}