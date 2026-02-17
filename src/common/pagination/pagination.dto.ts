import { IsInt, IsOptional, IsPositive, Min } from "class-validator";
import { Type } from "class-transformer";

export class PaginationDTO{
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @IsPositive()
    page: number ;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @IsPositive()
    limit?: number ;
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @IsPositive()
    skip: number ;
}