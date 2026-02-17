import { IsNotEmpty, IsString, Length, IsEmail, IsOptional,  } from "class-validator";

export class RegisterDTO{
    @IsNotEmpty()
    @IsString()
    @Length(2,150)
    name:String;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email:String;

    @IsNotEmpty()
    @IsString()
    @Length(2,150)
    password:String;

    @IsString()
    @IsOptional()
    phoneNumber:string


}