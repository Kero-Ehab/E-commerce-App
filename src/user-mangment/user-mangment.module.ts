import { Module } from '@nestjs/common';
import { UserMangmentController } from './user-mangment.controller';
import { UserMangmentService } from './user-mangment.service';
import { UserSchema } from './schema/user-schema';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    MongooseModule.forFeature([{name:'User', schema: UserSchema}]),
  ],
  controllers: [UserMangmentController],
  providers: [UserMangmentService],
})
export class UserMangmentModule {}
