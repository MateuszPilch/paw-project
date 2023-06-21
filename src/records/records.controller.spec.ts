import { Test, TestingModule } from '@nestjs/testing';
import { RecordsController } from './records.controller';
import { RecordsService } from './records.service';
import { UserDto } from 'src/auth/dto/user.dto';
import { Types } from 'mongoose';

describe('RecordsController', () => {
  let recordController: RecordsController;
  let recordService: RecordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecordsController],
      providers: [RecordsService],
    }).compile();

    recordController = module.get<RecordsController>(RecordsController);
    recordService = module.get<RecordsService>(RecordsService);
  });

  describe('getAllRecords', () => {
    it('should return an array of your records', async () => {
      const userSender = {
        _id: new Types.ObjectId("6491b99f5c3dfd674fd6e86d"),
        nickname: "TestUserSender",
      };

      const result = {
        _id: "6491cfec6dd902112b4b2779",
        id_sender: "6491b99f5c3dfd674fd6e86d",
        id_receiver: "000099998888777766665555",
        title: "Test 1",
        amount: 300,
        description: "New loan test",
        createdAt: "2023-06-20T16:12:28.962Z",
        updatedAt: "2023-06-20T16:12:28.962Z",
        __v: 0
    }
      jest.spyOn(recordService, 'findAll').mockResolvedValue(result)

      expect(await recordController.getAllRecords(userSender)).toBe(result);
    });
  });
});
