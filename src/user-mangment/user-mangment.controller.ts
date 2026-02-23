import { 
    Controller, 
    Post,
    Body, 
    Get, 
    Param, 
    Delete, 
    Patch, 
    Query, 
    ParseIntPipe, 
    UseInterceptors, 
    UploadedFile, 
    BadRequestException} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserMangmentService } from './user-mangment.service';
import { FileInterceptor } from '@nestjs/platform-express';
import type {Express, Response} from "express"


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
    findAll(
        @Query('pageNumber', ParseIntPipe) pageNumber:number,
        @Query('reviewPerPage', ParseIntPipe) reviewPerPage:number
    ){
        return this.userMangmentService.findAll(pageNumber, reviewPerPage);
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

    // @Post('upload-image')
    // //@UseGuards(AuthGuard)
    // @UseInterceptors(FileInterceptor('user-image'))
    // uploadProfileImage(
    //     @UploadedFile() file: Express.Multer.File,
    //     //@CurrentUser() payload: JWTPayload
    // ){
    //     if(!file) throw new BadRequestException("no image provided")
    //     //return this.userMangmentService.setProfileImage(payload.id, file.filename) 
    //     return 'ok'
    // }


    // @Delete("remove-profile-image")
    // //@UseGuards(AuthGuard)
    // removeProfileImage(@CurrentUser() payload: JWTPayload){
    //     return this.userMangmentService.removeProfileImage(payload.id)
    // }

    // @Get("images/:image")
    // @UseGuards(AuthGuard)
    // showProfileImage(@Param('image')image:string, @Res() res: Response){
    //     return res.sendFile(image,{root: 'images/users'})
    // }



}
