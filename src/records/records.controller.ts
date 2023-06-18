import { Controller, Req, Get, Post, Put, Delete, Body, Param, UseGuards, Query} from '@nestjs/common';
import { RecordsService } from './records.service';
import { Record } from './record.schema';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard())
@Controller('records')
export class RecordsController {
  constructor(private recordsService: RecordsService){}
  
  @Get(':id')
  async getRecord(@Param('id') id: string, @Req() req): Promise<Record> {
    return this.recordsService.findById(id, req.user);
  }

  @Get()
  async getAllRecords(@Query() query: ExpressQuery, @Req() req): Promise<Record[]> {
    return this.recordsService.findAll(req.user);
  }

  @Post()
  async createRecord(@Body() record: CreateRecordDto, @Req() req): Promise<Record> {
    return this.recordsService.create(record, req.user);
  }

  @Put(':id')
  async updateRecord(@Param('id') id: string, @Body() record: UpdateRecordDto, @Req() req): Promise<Record> {
    return this.recordsService.updateById(id, record, req.user);
  }
  
  @Delete(':id')
  async deleteRecord(@Param('id') id: string, @Req() req): Promise<Record> {
    return this.recordsService.delete(id, req.user);
  }
}