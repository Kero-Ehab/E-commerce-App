import { Injectable } from '@nestjs/common';
import { User } from './schema/user-schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { Model } from 'mongoose';

@Injectable()
export class UserMangmentService {
    constructor(@InjectModel(User.name) private userModel: Model<User>){}

    async create(createUserDto: CreateUserDto){
        const createuser = new this.userModel(createUserDto);
        return createuser.save();
    }
    async findAll(){
        return this.userModel.find().exec();
    }
}
