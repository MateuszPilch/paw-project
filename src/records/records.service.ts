import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Record } from './schemas/record.schema';
import { UserDto } from 'src/auth/dto/user.dto';

@Injectable()
export class RecordsService {
  constructor(@InjectModel(Record.name)private recordsModel: Model<Record>){
  }

  async getById(id: string, user: UserDto): Promise<Record> {
    
    await this.validateAccessPermission(id, user);

    return await this.recordsModel.findById(id);
  }

  async getAll(user: UserDto): Promise<Record[]> {

    const records = await this.recordsModel.find( {$or:[{ id_sender: user._id }, { id_receiver: user._id }] });
    
    if (!records) {
      throw new NotFoundException('Record not found.');
    }

    return records;
  }

  async create(record: Record, user: UserDto): Promise<{ message: string }> {

    const data = Object.assign(record, { id_sender: user._id });
    (await this.recordsModel.create(data)).save();

    return { message: "Record created." }

  }
  
  async updateById(id: string, record: Record, user: UserDto): Promise<{ message: string }> {

    await this.validateModificationPermission(id, user);

    await this.recordsModel.findByIdAndUpdate(id, record , {
      new: true,
      runValidators: true
    });

    return { message: "Record updated." }
  }

  async delete(id: string, user: UserDto): Promise<{ message: string }> {

    await this.validateModificationPermission(id, user);
    
    await this.recordsModel.findByIdAndDelete(id);

    return { message: "Record deleted." }
  }

  async validateAccessPermission(id: string, user: UserDto) {

  const record = await this.recordsModel.findById(id);

    if (!record){
      throw new NotFoundException('Record not found.');
    }
    else if(!(user._id.equals(record.id_sender)) && !(user._id.equals(record.id_receiver))){
      throw new UnauthorizedException('Access denied.');
    }
  }

  async validateModificationPermission(id: string, user: UserDto) {

    const record = await this.recordsModel.findById(id);
    
    if (!record){
      throw new NotFoundException('Record not found.');
    }
    else if(!user._id.equals(record.id_sender)){
      throw new UnauthorizedException('Access denied.');
    }
  }
}