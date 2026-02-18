import { Module } from "@nestjs/common"; 
import { MailerModule, MailerService } from "@nestjs-modules/mailer";
import { ConfigService } from "@nestjs/config";
import { EmailService } from "./email.service";
import { join } from "node:path";
import {EjsAdapter} from "@nestjs-modules/mailer/dist/adapters/ejs.adapter"
@Module({
    imports:[
        MailerModule.forRootAsync({
            inject:[ConfigService],
            useFactory:(configService:ConfigService)=>{
                return{
                    transport:{
                        host: configService.get<string>("MAIL_HOST"),
                        port: Number(configService.get<string>("MAIL_PORT")),
                        secure:false,// in dev =>false , in production => true
                        auth:{
                            user: configService.get<string>("EMAIL"),
                            pass:configService.get<string>("PASSWORD")
                        }
                    },
                    template:{
                        dir:join(__dirname, 'templates'),
                        adapter: new EjsAdapter({
                            inlineCssEnabled:true
                        })
                    }
                    
                }
            }
        })
    ],
    providers:[EmailService],
    exports:[EmailService]
})

export class EmailModule{}