import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { User } from './schema/user-schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { Types } from 'mongoose';
@Injectable()
export class UserMangmentService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>, 
        private configService: ConfigService,
    ){}

    async create(createUserDto: CreateUserDto){
        const createuser = new this.userModel(createUserDto);
        if(createuser.email === undefined || createuser.email === null){
            throw new Error("Email is required");
        }
        const emailExists = await this.userModel.findOne({email: createuser.email});
        if(emailExists){
            throw new Error("Email already exists");
        }
        const saltRounds = this.configService.get<string>('BCRYPT_SALT_ROUNDS');
        const saltRoundsNumber = saltRounds ? parseInt(saltRounds) : 10;
        const hashedPassword = await bcrypt.hash(createUserDto.password, saltRoundsNumber);
        
        const user = new this.userModel({...createUserDto, password:hashedPassword});

        return user.save();
    }

    async findAll(pageNumber?:number, reviewPerPage?:number){
        if (pageNumber && reviewPerPage) {
        return await this.userModel
            .find({})
            .skip(reviewPerPage * (pageNumber - 1))
            .limit(reviewPerPage)
            .select('-password');
    }
    return await this.userModel.find().select('-password');
    }

    async findOne(id:string){
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException('Invalid user id');
        }
        const user =  await this.userModel.findById(id).select('-password');
        if(!user){
            throw new NotFoundException("User not found");
        }
        return user;
    }
    async delete(id:string){
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException('Invalid user id');
        }
        const user =  await this.userModel.findById(id).select('-password');
        if(!user){
            throw new NotFoundException("User not found");
        }
        return await this.userModel.findByIdAndDelete(id);
    }

    async update(updateUserDto: UpdateUserDto, id:string){
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException('Invalid user id');
        }
        if (Object.keys(updateUserDto).length === 0) {
            throw new BadRequestException('No data provided for update');
        }
        const updatedUser =  await this.userModel.findByIdAndUpdate(id, updateUserDto, {new:true});
        if(!updatedUser){
            throw new NotFoundException("User not found");
        }

        return updatedUser;
    }
}
