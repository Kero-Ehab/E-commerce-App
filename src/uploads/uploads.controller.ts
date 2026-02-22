import { Controller, Post, UseInterceptors, UploadedFile, BadRequestException, Res, Get, Param, UploadedFiles } from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import type {Express, Response} from "express"




@Controller("uploads")
export class UploadsController {


    @Post("")
    @UseInterceptors(FileInterceptor('file'))

    
    public UploadedFile(@UploadedFile() file: Express.Multer.File){
        if(!file) throw new BadRequestException("no file provided")
            console.log("File uploaded", {file})
        return { message: "File uploaded successfully"}
    }

    @Get(":image")
    public showUploadedImage(@Param("image") image: string, @Res() res: Response){
        return res.sendFile(image, {root:'images'})
    }

    
    @Post('multiple-files')
    @UseInterceptors(FilesInterceptor('files'))
    uploadMultipleFiles(@UploadedFiles() files: Array<Express.Multer.File>){
        
        
        if(!files || files.length === 0){
            throw new BadRequestException("no file provided")
        } 
            
        console.log("File uploaded", {files});
        return {message: "File uploaded successfully"}    
    }

}
