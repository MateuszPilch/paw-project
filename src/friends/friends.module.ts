import { Module } from '@nestjs/common';
import { FriendsController } from './friends.controller';
import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FriendsService } from './friends.service';
import { User, UserSchema } from '../auth/schemas/user.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{name: User.name, schema: UserSchema},])],
  controllers: [FriendsController],
  providers: [FriendsService]
})
export class FriendsModule {}
