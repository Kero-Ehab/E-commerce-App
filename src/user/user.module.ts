import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from 'src/user-mangment/schema/user-schema';
import { UserSchema } from 'src/user-mangment/schema/user-schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name: User.name, schema:UserSchema}
    ])
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
