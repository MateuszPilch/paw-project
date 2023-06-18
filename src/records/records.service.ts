import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Record } from './record.schema';
import { User } from 'src/auth/user.schema';

@Injectable()
export class RecordsService {
  constructor(@InjectModel(Record.name)private recordsModel: Model<Record>){
  }

  async findById(id: string, user: User): Promise<Record> {
    
    await this.checkRecordAuthorization(id, user);

    return await this.recordsModel.findById(id);
  }

  async findAll(user: User): Promise<Record[]> {

    const records = await this.recordsModel.find( {$or:[{id_sender: user._id}, {id_receiver: user._id}]});
    
    if (!records) {
      throw new NotFoundException('Record not found.');
    }

    return records;
  }

  async create(record: Record, user: User): Promise<Record> {

    const data = Object.assign(record, {id_sender: user._id});

    return (await this.recordsModel.create(data)).save();
  }
  
  async updateById(id: string, record: Record, user: User): Promise<Record>{

    await this.checkRecordAuthorization(id, user);

    return await this.recordsModel.findByIdAndUpdate(id, record , {
      new: true,
      runValidators: true
    });
  }

  async delete(id: string, user: User): Promise<Record> {

    await this.checkRecordAuthorization(id, user);
    
    return await this.recordsModel.findByIdAndDelete(id);
  }

  async checkRecordAuthorization(id: string, user: User) {

    const record = await this.recordsModel.findById(id);
    
    if (!record || (user._id !== record.id_sender && user._id !== record.id_receiver)) {
      throw new NotFoundException('Record not found.');
    }
  }
}