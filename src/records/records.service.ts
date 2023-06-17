import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Record } from './record.schema';

@Injectable()
export class RecordsService {
  constructor(@InjectModel(Record.name)private recordsModel: Model<Record>){
  }

  async findById(id: string): Promise<Record> {
    return await this.recordsModel.findById(id);
  }

  async findAll(): Promise<Record[]> {
    return await this.recordsModel.find();
  }

  async create(record: Record): Promise<Record> {
    return (await this.recordsModel.create(record)).save();
  }
  
  async updateById(id: string, record: Record): Promise<Record>{
    return await this.recordsModel.findByIdAndUpdate(id, record , {
      new: true,
      runValidators: true
    });
  }

  async delete(id: string): Promise<Record> {
    return await this.recordsModel.findByIdAndDelete(id);
  }

}