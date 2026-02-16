import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";


export class CreateUserDto {
    @IsString()
    @Length(3, 50)
    @IsNotEmpty()
    name:string;
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email:string;
    @IsNotEmpty()
    @Length(6, 60)
    @IsString()
    password:string;
    @IsOptional()
    @IsString()
    phonenumber?:string;
    @IsOptional()
    @IsInt()
    age?:number;
}