import { IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserProfileDto  {
    
    @IsOptional()
    @IsString()
    name?:string;
    
    @IsOptional()
    @IsString()
    email?: string

    @IsOptional()
    @IsString()
    phone?:string

    @IsOptional()
    @IsNumber()
    age?:number

    @IsOptional()
    @IsString()
    profileImage?:number


    @IsOptional()
    @IsString()
    @MinLength(6)
    newPassword?:string

    @IsOptional()
    @IsString()
    currentPassword?:string
    

}
