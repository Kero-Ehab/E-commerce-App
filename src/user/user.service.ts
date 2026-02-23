import { Injectable } from '@nestjs/common';
import { UpdateUserProfileDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  
  getMyProfile(){
    
  }

  update( updateUserProfileDto: UpdateUserProfileDto) {
    return `ok`;
  }

  remove() {
    return `OK`;
  }
}
