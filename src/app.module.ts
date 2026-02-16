import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserMangmentModule } from './user-mangment/user-mangment.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/e-commerce'), UserMangmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
