import { Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserMangmentService } from './user-mangment.service';

@Controller('user-mangment')
export class UserMangmentController {
    constructor(
        private userMangmentService: UserMangmentService,
    ){}

    @Post()
    create(createUserDto: CreateUserDto){
        return this.userMangmentService.create(createUserDto);
    }
}
