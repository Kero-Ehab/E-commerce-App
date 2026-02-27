import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserProfileDto } from './dto/update-user.dto';
import { AuthGuard, JWTPayload } from 'src/auth/guards/auth.guards';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/user-mangment/schema/user-schema';


@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private configService: ConfigService
  ) {}

  //@UseGuards(AuthGuard)
  @Get('me')
  getMe(@Request() req: Request & {user:JWTPayload} ) {
    const payload = req['user'];
    return this.userService.getMyProfile(payload.sub);
  }

  @Patch()
  update(@Body() updateUserProfileDto: UpdateUserProfileDto) {
    return this.userService.update(updateUserProfileDto);
  }

  @Delete()
  remove() {
    return this.userService.remove();
  }
}
