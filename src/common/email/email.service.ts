import { Injectable, RequestTimeoutException } from '@nestjs/common'
import * as nodemailer from 'nodemailer'
import { MailerService } from '@nestjs-modules/mailer'



@Injectable()
export class EmailService{
    constructor(
        private readonly mailerService:MailerService
    ){}


    public async sendLogInEmail(email:string){
        try {
                    const today = new Date();
                    await this.mailerService.sendMail({
                    to: email,
                    from: `<no-reply@my-nestjs-app.com>`,
                    subject:'Log-in',
                    template:'login',
                    context:{email, today}
                    })
                } catch (error) {
                    console.log(error)
                    throw new RequestTimeoutException();
                }
    }
    
    public async sendResetPasswordTemplate(email:string, otp:string){
            try {
                    const today = new Date();
                    await this.mailerService.sendMail({
                    to: email,
                    from: `<no-reply@my-nestjs-app.com>`,
                    subject:'Log-in',
                    html:
                    `<div style="font-family: Arial">
                        <h2>Password Reset</h2>
                        <p>Your OTP code is:</p>
                        <h1>${otp}</h1>
                        <p>This code expires in 15 minutes.</p>
                    </div>
                    `,
                    })
                } catch (error) {
                    console.log(error)
                    throw new RequestTimeoutException();
                }
    }


}







