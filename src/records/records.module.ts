import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Record, RecordSchema } from './record.schema';
import { RecordsController } from './records.controller';
import { RecordsService } from './records.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{name: Record.name, schema: RecordSchema}])],
  controllers: [RecordsController],
  providers: [RecordsService]
})
export class RecordsModule {}
