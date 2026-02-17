import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserMangmentModule } from 'src/user-mangment/user-mangment.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user-mangment/schema/user-schema';

@Module({
  imports: [
    UserMangmentModule,
    MongooseModule.forFeature([
      {name:User.name, schema:UserSchema}
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
