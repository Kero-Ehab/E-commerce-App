import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserMangmentModule } from 'src/user-mangment/user-mangment.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user-mangment/schema/user-schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    UserMangmentModule,
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
  providers: [AuthService],
})
export class AuthModule {}
