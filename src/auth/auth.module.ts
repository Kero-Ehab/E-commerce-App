import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserMangmentModule } from 'src/user-mangment/user-mangment.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user-mangment/schema/user-schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailModule } from 'src/common/email/email.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guards';
import { AuthRolesGuard } from './guards/roles.guards';
@Module({
  imports: [
    UserMangmentModule,
    MailerModule,
    EmailModule,
    MongooseModule.forFeature([
      {name:User.name, schema:UserSchema}
    ]),
    JwtModule.registerAsync({
      inject:[ConfigService],
      imports:[ConfigModule],
      useFactory:(configService:ConfigService)=>({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: {expiresIn:'1h'}
      })

    }),

    
    
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
  // {
  //   provide:APP_GUARD,
  //   useClass:AuthGuard,
  // },{
  //   provide:APP_GUARD,
  //   useClass:AuthRolesGuard,
  // }
  ],
})
export class AuthModule {}
