import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserProfileDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user-mangment/schema/user-schema';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  
  constructor(
          @InjectModel(User.name) private userModel: Model<User>, 
          private configService: ConfigService,
      ){}

  async getMyProfile(userId: string) {
    const user = await this.userModel
      .findById(userId)
      .select('-password')
      .exec();
      console.log(user)
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  update( updateUserProfileDto: UpdateUserProfileDto) {
    return `ok`;
  }

  remove() {
    return `OK`;
  }
}
