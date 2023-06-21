import { Controller, Req, Get, Delete, Body, Param, UseGuards, Patch} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FriendsService } from './friends.service';
import { Friend } from './schemas/friend.schema';
import { UserDto } from '../auth/dto/user.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('friends')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@ApiTags('Friends')
export class FriendsController {
  constructor(private friendsService: FriendsService){}

  @Get(':nickname') 
  @ApiOperation({summary: 'Get friend by nickname'})
  @ApiResponse({ status: 200, description: 'List of user by username.',  
  schema: {
    type: 'array',
    items: {
      type: 'object',
      properties: { 
        _id: {
          type: 'ObjectId',
          example: '6491b99f5c3dfd674fd6e86d'
        },
        nickname: {
          type: 'string',
          example: 'Test user 2'
        },
      }
    }
  }})
  @ApiResponse({ status: 404, description: 'Friends not found.' })
  async getByNickname(@Param('nickname') nickname: string, @Req() req): Promise<Friend[]> {
    return this.friendsService.getByNickname(nickname, req.user);
  }

  @Get()
  @ApiOperation({summary: 'Get your friends list'})
  @ApiResponse({ status: 200, description: 'List of your friends.',  
    schema: {
    type: 'array',
    items: {
      type: 'object',
      properties: { 
        _id: {
          type: 'ObjectId',
          example: '6491b99f5c3dfd674fd6e86d'
        },
        nickname: {
          type: 'string',
          example: 'Test user 2'
        },
      }
    }
  }})
  @ApiResponse({ status: 401, description: 'Access denied.' })
  @ApiResponse({ status: 404, description: 'Friends not found.' })
  async getFriendsList(@Req() req){
    return this.friendsService.getFriendsList(req.user);
  }

  @Patch()
  @ApiOperation({summary: 'Add new friend to your friends list'})
  @ApiBody({
    schema: {
      properties: { 
        _id: {
          type: 'ObjectId',
          example: '6491b99f5c3dfd674fd6e86d'
        },
        nickname: {
          type: 'string',
          example: 'Test user 2'
        },
      }
    }
  })
  @ApiResponse({ status: 200, description: 'Friend added.' })
  @ApiResponse({ status: 401, description: 'Access denied.' })
  async addFriend(@Body() friend: UserDto, @Req() req): Promise<{ message: string }> {
    return this.friendsService.add(friend, req.user);
  }
  
  @Delete()
  @ApiOperation({summary: 'Delete friend from your friends list'})
  @ApiBody({
    schema: {
      properties: { 
        _id: {
          type: 'ObjectId',
          example: '6491b99f5c3dfd674fd6e86d'
        },
        nickname: {
          type: 'string',
          example: 'Test user 2'
        },
      }
    }
  })
  @ApiResponse({ status: 200, description: 'Friend deleted.' })
  @ApiResponse({ status: 401, description: 'Access denied.' })
  async deleteFriend(@Body() friend: UserDto, @Req() req): Promise<{ message: string }> {
    return this.friendsService.delete(friend, req.user);
  }
}