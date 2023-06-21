import { Test, TestingModule } from '@nestjs/testing';
import { RecordsController } from './records.controller';

describe('RecordsController', () => {
  let recordController: RecordsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecordsController],
    }).compile();

    recordController = module.get<RecordsController>(RecordsController);
  });

  it('should be defined', () => {
    expect(recordController).toBeDefined();
  });
});
