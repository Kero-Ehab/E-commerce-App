import { IsString, MinLength, IsNotEmpty, IsEmail } from "class-validator";

export class ChangePasswordDTO{

    @IsString()
    oldPassword:string

    @IsString()
    @MinLength(6)
    newPassword:string

    
        @IsNotEmpty()
        @IsString()
        @IsEmail()
        email:String;
    
}