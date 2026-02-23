import { BadRequestException, Module } from '@nestjs/common';
import { UserMangmentController } from './user-mangment.controller';
import { UserMangmentService } from './user-mangment.service';
import { UserSchema } from './schema/user-schema';
import { MongooseModule } from '@nestjs/mongoose';
import { diskStorage } from 'multer';
import { MulterModule } from '@nestjs/platform-express';
import { UserModule } from 'src/user/user.module';
@Module({
  imports: [
    MongooseModule.forFeature([{name:'User', schema: UserSchema}]),
    MulterModule.register(
      {
            storage: diskStorage({
                destination:'./images/users',
                filename: (req, file, cb) =>{
                    const prefix = `${Date.now()}-${Math.round(Math.random()* 1000000)}`;
                    const filename = `${prefix}-${file.originalname}`
                }
            }),
            fileFilter:(req, file, cb)=>{
                        if(file.mimetype.startsWith('image')){
                            cb(null, true);
                        }else{
                            cb(new BadRequestException('Unsupported file format'), false)
                        }
                    },
                    limits:{fileSize: 1024*1024*2}//2MB
        }
    ),
    UserModule
  ],
  controllers: [UserMangmentController],
  providers: [UserMangmentService],
})
export class UserMangmentModule {}
