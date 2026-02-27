import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserPasswordDto  {
    

    @IsOptional()
    @IsString()
    @MinLength(6)
    newPassword?:string

    @IsOptional()
    @IsString()
    currentPassword?:string

    @IsOptional()
    @IsString()
    confirmPassword?:string
    

}
