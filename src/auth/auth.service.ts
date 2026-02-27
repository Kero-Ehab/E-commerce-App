import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';
import {ChangePasswordDTO} from './dto/changePassword.dto'
import { ForgetPassword } from './dto/forgetPassword.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user-mangment/schema/user-schema';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/common/email/email.service';

@Injectable()
export class AuthService {
  private readonly saltRounds:number
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private configService: ConfigService,
    private jwtService: JwtService,
    private readonly emailService:EmailService 
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
      // spread the incoming DTO (not the class) so the actual values are stored
      const user = await this.userModel.create({ ...registerDto, password: hashPassword });
      
      return {
        user:{
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber || ''        
      }}
    }
    
    async login(loginDto:LoginDTO){
      const {email, password} = loginDto;
      const userExist = await this.userModel.findOne({email}).select('+password')
      if(!userExist){
        throw new UnauthorizedException('Invalid Email or Password')
      }
      console.log("email done")
      const passwordCheck = await bcrypt.compare(password,userExist.password )
      if(!passwordCheck){
        throw new UnauthorizedException('Invalid Email or Password')
      }
      const payload = {
        sub: userExist._id.toString(),
        email: userExist.email,
        role:userExist.role
      };
      const acessToken = await this.jwtService.signAsync(payload);
      const refreshToken = await this.jwtService.signAsync(payload);
      return { acessToken, refreshToken };
    }

    async logout(userId:string){
      await this.userModel.findByIdAndUpdate(userId,{
        refreshToken:null
      })
      return { message: 'Logged out successfully' };
    }

    async changePassword(changePasswordDTO:ChangePasswordDTO){
      const {email, oldPassword, newPassword} = changePasswordDTO;
      const userExist = await this.userModel.findOne({email}).select('+password')
      if(!userExist){
        throw new UnauthorizedException('Invalid Email');
      }
      const checkPassword = await bcrypt.compare(oldPassword, userExist.password)
      if(!checkPassword){
        throw new UnauthorizedException('Invalid Password');
      }
      const hashPassword = await bcrypt.hash(newPassword, this.saltRounds)
      userExist.password=hashPassword;

      await userExist.save()

      //generate token

      return {message:"password updated sucessfully"}

    }

    async forgetPassword(forgetPassword:ForgetPassword){
      const {email} = forgetPassword;
      const isUserExist = await this.userModel.findOne({email})
      if(!isUserExist){
        throw new UnauthorizedException("Invalid Email");
      }
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

      await this.emailService.sendResetPasswordTemplate(email,otp) 
      
      const user = await this.userModel.findByIdAndUpdate(isUserExist._id, {otp, expiresAt})
      
      return {message:"OTP SEND SUCESSFULLY"}

    }



}
