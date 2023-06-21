import { Controller, Req, Get, Post, Put, Delete, Body, Query, UseGuards, Param} from '@nestjs/common';
import { RecordsService } from './records.service';
import { Record } from './schemas/record.schema';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@Controller('records')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@ApiTags('Records')
export class RecordsController {
  constructor(private recordsService: RecordsService){}
  
  @Get(':id') 
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get record by id' })
  @ApiResponse({ status: 200, description: 'Record data',
  schema: {
    type: 'object',
    properties: {
      _id: {
        type: 'ObjectId',
        example: '11110000111100001111abcd'
      },
      id_sender: {
        type: 'ObjectId',
        example: '000011112222333344445555'
      },
      id_receiver: {
        type: 'ObjectId',
        example: '6491b99f5c3dfd674fd6e86d'
      },
      title: {
        type: 'string',
        example: 'Test record'
      },
      amount: {
        type: 'number',
        example: '100'
      },
      description: {
        type: 'string',
        example: 'Description of the test record'
      },
      createdAt: {
        type: 'string',
        example: '2023-01-01T12:00:00.000Z'
      },
      updatedAt: {
        type: 'string',
        example: '2023-01-01T12:00:00.000Z'
      },
      __v: {
        type: 'number',
        example: 0
      }
    }
  }})
  @ApiResponse({ status: 401, description: 'Access denied.' })
  @ApiResponse({ status: 404, description: 'Record not found.' })
  async getRecord(@Param('id') id: string, @Req() req): Promise<Record> {
    return this.recordsService.getById(id, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all records' })
  @ApiResponse({ status: 200, description: 'Record data',
  schema: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        _id: {
          type: 'ObjectId',
          example: '11110000111100001111abcd'
        },
        id_sender: {
          type: 'ObjectId',
          example: '000011112222333344445555'
        },
        id_receiver: {
          type: 'ObjectId',
          example: '6491b99f5c3dfd674fd6e86d'
        },
        title: {
          type: 'string',
          example: 'Test record'
        },
        amount: {
          type: 'number',
          example: '100'
        },
        description: {
          type: 'string',
          example: 'Description of the test record'
        },
        createdAt: {
          type: 'string',
          example: '2023-01-01T12:00:00.000Z'
        },
        updatedAt: {
          type: 'string',
          example: '2023-01-01T12:00:00.000Z'
        },
        __v: {
          type: 'number',
          example: 0
        }
      }
    }
  }})
  @ApiResponse({ status: 404, description: 'Record not found.' })
  async getAllRecords(@Req() req): Promise<Record[]> {
    return this.recordsService.getAll(req.user);
  }

  @Post()
  @ApiOperation({ summary: 'Create new record' })
  @ApiBody({
    schema: {
      properties: { 
        id_receiver: {
          type: 'ObjectId',
          example: '6491b99f5c3dfd674fd6e86d'
        },
        title: {
          type: 'string',
          example: 'Test record'
        },
        amount: {
          type: 'number',
          example: '100'
        },
        description: {
          type: 'string',
          example: 'Description of the test record'
        },
      }
    }
  })
  @ApiResponse({ status: 201, description: 'Record created.' })
  @ApiResponse({ status: 401, description: 'Access denied.' })
  @ApiResponse({ status: 404, description: 'Record not found.' })
  async createRecord(@Body() record: CreateRecordDto, @Req() req): Promise<{ message: string }> {
    return this.recordsService.create(record, req.user);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update existing record' })
  @ApiBody({
    schema: {
      properties: { 
        id_receiver: {
          type: 'ObjectId',
          example: '6491b99f5c3dfd674fd6e86d'
        },
        title: {
          type: 'string',
          example: 'Test record updated'
        },
        amount: {
          type: 'number',
          example: '150'
        },
        description: {
          type: 'string',
          example: 'Description of the test record'
        },
      }
    }
  })
  @ApiResponse({ status: 200, description: 'Record updated.' })
  @ApiResponse({ status: 401, description: 'Access denied.' })
  @ApiResponse({ status: 404, description: 'Record not found.' })
  async updateRecord(@Query('id') id: string, @Body() record: UpdateRecordDto, @Req() req): Promise<{ message: string }> {
    return this.recordsService.updateById(id, record, req.user);
  }
  
  @Delete(':id')
  @ApiOperation({ summary: 'Delete existing record' })
  @ApiResponse({ status: 200, description: 'Record deleted.' })
  @ApiResponse({ status: 401, description: 'Access denied.' })
  @ApiResponse({ status: 404, description: 'Record not found.' })
  async deleteRecord(@Query('id') id: string, @Req() req): Promise<{ message: string }> {
    return this.recordsService.delete(id, req.user);
  }
}