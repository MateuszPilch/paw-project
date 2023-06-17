import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards} from '@nestjs/common';
import { RecordsService } from './records.service';
import { Record } from './record.schema';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard())
@Controller('records')
export class RecordsController {
  constructor(private recordsService: RecordsService){}
  
  @Get(':id')
  async getRecord(@Param('id') id: string): Promise<Record> {
    return this.recordsService.findById(id);
  }

  @Get()
  async getAllRecords(): Promise<Record[]> {
    return this.recordsService.findAll();
  }

  @Post()
  async createRecord(@Body() record: CreateRecordDto): Promise<Record> {
    return this.recordsService.create(record);
  }

  @Put(':id')
  async updateRecord(@Param('id') id: string, @Body()record: UpdateRecordDto): Promise<Record> {
    return this.recordsService.updateById(id, record);
  }
  
  @Delete(':id')
  async deleteRecord(@Param('id') id: string): Promise<Record> {
    return this.recordsService.delete(id);
  }
}