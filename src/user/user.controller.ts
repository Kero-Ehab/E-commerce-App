import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserProfileDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    // private readonly
  ) {}

  @Get('me')
  get(){
    return this.userService.getMyProfile();
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
