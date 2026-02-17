import { ConflictException, Inject, Injectable} from '@nestjs/common';
import { RegisterDTO } from './dto/register.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user-mangment/schema/user-schema';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  private readonly saltRounds:number
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private configService: ConfigService
  ){
    this.saltRounds= Number(this.configService.get<string>('BCRYPT_SALT_ROUNDS','10'))
  }
  
    async register(registerDto:RegisterDTO){
      const {email , password, name, phoneNumber} = registerDto;
      const userExist = await this.userModel.findOne({email}) 
      if(userExist){
        throw new ConflictException('Email already registered');
      }
      const userPhoneExist = await this.userModel.findOne({phoneNumber})
      if(userPhoneExist){
        throw new ConflictException('Phone number already registered');
      }
      const hashPassword = await bcrypt.hash(password, this.saltRounds)
      const user = new this.userModel({
          name,
          email,
          phoneNumber,
          password:hashPassword,
      })
      await user.save();
      return {
        user:{
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        phoneNumber: String(user.phoneNumber || ''),
        //password:hashPassword,
        
      }}
    }

}
