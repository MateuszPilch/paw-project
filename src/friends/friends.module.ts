import { Module } from '@nestjs/common';
import { FriendsController } from './friends.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FriendsService } from './friends.service';
import { User, UserSchema } from 'src/auth/schemas/user.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{name: User.name, schema: UserSchema},])],
  controllers: [FriendsController],
  providers: [FriendsService]
})
export class FriendsModule {}
