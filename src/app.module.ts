import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserMangmentModule } from './user-mangment/user-mangment.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './common/email/email.module';


@Module({
  imports: [
      MongooseModule.forRootAsync({
        imports:[ConfigModule],
        inject:[ConfigService],
        useFactory: async (configService: ConfigService) =>({
          uri:configService.get<string>('MONGO_URI'),
        })
      }),
    UserMangmentModule,
    ConfigModule.forRoot({
      isGlobal:true,
    }),
    AuthModule,
    EmailModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
