import { IsNotEmpty, IsOptional, IsString,  IsUrl,  MaxLength, MinLength } from "class-validator";


export class CreateCategoryDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3, {message:'name must be at least 3 characters'})
    @MaxLength(30, {message:'name must be at most 30 characters'})
    name: string

    @IsString()
    @IsUrl()
    @IsOptional()
    //@IsURL({ require_protocol: true })
    image: string

}

