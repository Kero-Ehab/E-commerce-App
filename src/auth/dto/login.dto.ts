import { IsString, IsNotEmpty, IsEmail, Length } from "class-validator";

export class LoginDTO{

        @IsNotEmpty()
        @IsString()
        @IsEmail()
        email:String;
    
        @IsNotEmpty()
        @IsString()
        @Length(2,150)
        password:String;
}