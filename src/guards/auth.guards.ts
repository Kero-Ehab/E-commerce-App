import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { CURRENT_USER_KEY } from 'src/common/constants.ts/constants';
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService : JwtService,
        private readonly configService : ConfigService
    ){}
    async canActivate(context: ExecutionContext){
        const request : Request = context.switchToHttp().getRequest();
        const [type, token] = request.headers.authorization?.split(" ") ?? [];
        if(token && type === "Bearer"){
            try {
                    const payload: JWTPayload  = await this.jwtService.verifyAsync(
                    token,
                    {
                        secret: this.configService.get<string>("JWT_SECRET")
                    }
                );
                    request[CURRENT_USER_KEY]=payload
            } catch (error) {
                throw new UnauthorizedException("acess denied, invalid token");
                
            }
        }else{
            throw new UnauthorizedException("acess denied, no token provided");
        }
        return true;
    }
}

    export interface JWTPayload {
    sub: string;
    email: string;
    }
