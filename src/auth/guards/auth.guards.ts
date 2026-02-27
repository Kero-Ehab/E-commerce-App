import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { CURRENT_USER_KEY } from 'src/common/constants.ts/constants';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { User } from 'src/user-mangment/schema/user-schema';
import { UserType } from '../Roles/userTypes.roles';
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService : JwtService,
        private readonly configService : ConfigService,
        private readonly reflector: Reflector,   
    ){}
    async canActivate(context: ExecutionContext){
        const isPublic = this.reflector.getAllAndOverride<boolean>(
        IS_PUBLIC_KEY,
        [context.getHandler(), context.getClass()],
    );
    if (isPublic) {
      return true;                   // skip auth check
    }
        const request : Request & {user:JWTPayload} = context.switchToHttp().getRequest();
        const [type, token] = request.headers.authorization?.split(" ") ?? [];
        if(token && type === "Bearer"){
            try {
                    const payload : JWTPayload  = await this.jwtService.verifyAsync(
                    token,
                    {
                        secret: this.configService.get<string>("JWT_SECRET")
                    }
                );
                    request.user=payload 
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
        role:UserType;
    }
