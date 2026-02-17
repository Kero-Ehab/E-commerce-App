import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';
import { ChangePasswordDTO } from './dto/changePassword.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

    @Post('register')
    register(@Body() registerDto:RegisterDTO){
      return this.authService.register(registerDto)
    }

    @Post('login')
    login(@Body() loginDto:LoginDTO){
      return this.authService.login(loginDto)
    }

    @Post('logout/:id')
    logout(userId:string){
      return this.authService.logout(userId)
    }

    @Put('changePassword')
    changePassword(@Body() changePasswordDTO:ChangePasswordDTO){
      return this.authService.changePassword(changePasswordDTO)
    }

}
