import { Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { UserDto } from 'src/auth/dto/user.dto';
import { Friend } from './schemas/friend.schema';

@Injectable()
export class FriendsService {
  constructor(@InjectModel(User.name)private usersModel: Model<User>){
  }

  async findByNickname(nickname: string, user: UserDto): Promise<Friend[]>{

    const data = await this.usersModel.find({ nickname: nickname }).select("_id nickname");

    const friendsList = data.filter((friend) => friend._id !== user._id);

    if (!friendsList || friendsList.length === 0) {
      throw new NotFoundException('Friends not found.');
    }

    return friendsList;
  }

  async friendsList(user: UserDto){

    await this.validateAccessPermission(user);
    
    const data = await this.usersModel.findOne({ _id: user._id }).select("friends");

    const friendsList = data.friends.map(({ _id, nickname }) => ({ _id, nickname }));

    if (!friendsList || friendsList.length === 0) {
      throw new NotFoundException('Friends not found.');
    }

    return friendsList;
  }

  async add(friend: UserDto, user: UserDto): Promise<{ message: string }> {
    
    await this.validateAccessPermission(user);

    await this.usersModel.findByIdAndUpdate(
      { _id: user._id },
      { $addToSet: { friends: { _id: new Types.ObjectId(friend._id.toString()), nickname: friend.nickname } } },
      { new: true },
    );

    await this.usersModel.findByIdAndUpdate(
      { _id: friend._id },
      { $addToSet: { friends: { _id: new Types.ObjectId(user._id.toString()), nickname: user.nickname } } },
      { new: true },
    );

    return { message: "Friend added." };
  }

  async delete(friend: UserDto, user: UserDto): Promise<{ message: string }> {
    
    await this.validateAccessPermission(user);

    await this.usersModel.findByIdAndUpdate(
      { _id: user._id },
      { $pull: { friends: { _id: { $eq: friend._id } } } },
      { new: true },
    );

    await this.usersModel.findByIdAndUpdate(
      { _id: friend._id},
      { $pull: { friends: { _id: { $eq: user._id } } } },
      { new: true },
    );

    return { message: "Friend deleted." }
  }
  async validateAccessPermission(user: UserDto) {

    const data = await this.usersModel.findById({ _id: user._id });
    
    if (!data){
      throw new UnauthorizedException('Access denied.');
    }
  }
}