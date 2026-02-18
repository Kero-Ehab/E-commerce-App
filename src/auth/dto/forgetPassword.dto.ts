import { IsEmail } from "class-validator"


export class ForgetPassword{
    @IsEmail()
    email:string
} 