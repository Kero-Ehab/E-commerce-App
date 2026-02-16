import { Controller, Post,Body, Get, Param, Delete, Patch } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserMangmentService } from './user-mangment.service';

@Controller('user-mangment')
export class UserMangmentController {
    constructor(
        private userMangmentService: UserMangmentService,
    ){}

    @Post('create')
    create(@Body() createUserDto: CreateUserDto){
        return this.userMangmentService.create(createUserDto); 
    }
    @Get('findAll')
    findAll(){
        return this.userMangmentService.findAll();
    }
    @Get('findOne/:id')
    findOne(@Param('id') id:string){
        return this.userMangmentService.findOne(id);
    }
    @Delete('delete/:id')
    delete(@Param('id') id:string){
        return this.userMangmentService.delete(id);
    }
    @Patch('update/:id')
    update(@Body()updateUserDto: UpdateUserDto, @Param('id') id:string){
        return this.userMangmentService.update(updateUserDto, id);
    }
}
