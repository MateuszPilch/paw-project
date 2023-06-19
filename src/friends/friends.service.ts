import { Injectable, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { FriendDto } from './dto/friend.dto';

@Injectable()
export class FriendsService {
  constructor(@InjectModel(User.name)private usersModel: Model<User>){
  }

  async findByNickname(nickname: string, user: User){

    const data = await this.usersModel.find({nickname: nickname},{});

    if (!data) {
      throw new NotFoundException('Friend not found.');
    }

    return data;
  }

  async friendsList(user: User){

    const data = await this.usersModel.findById(user._id).select("friends");
    
    if (!data) {
      throw new NotFoundException('Friends not found.');
    }

    return data;
  }

  async add(friend: FriendDto, user: User): Promise<{ message: string }> {
    
    await this.usersModel.findByIdAndUpdate(
      { _id: user._id },
      { $addToSet: {friends: friend} },
      { new: true },
    );

    return { message: "Friend added." };
  }

  async delete(id: string, user: User): Promise<{ message: string }> {
    
    await this.usersModel.findByIdAndUpdate(
      { _id: user._id },
      { $pull: { friends: { _id: { $eq: id } } } },
      { new: true },
    );

    return { message: "Friend deleted." }
  }
}