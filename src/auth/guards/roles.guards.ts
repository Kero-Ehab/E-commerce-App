import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { CURRENT_USER_KEY } from 'src/common/constants.ts/constants';
import { Reflector } from '@nestjs/core';
import { UserType } from 'src/auth/Roles/userTypes.roles';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class AuthRolesGuard implements CanActivate {
    constructor(
        private readonly jwtService : JwtService,
        private readonly configService : ConfigService,
        private readonly reflector: Reflector,
        
    ){}
    async canActivate(context: ExecutionContext){
        
        const isPublic = this.reflector.getAllAndOverride<boolean>(
            IS_PUBLIC_KEY,
            [
                context.getHandler(),
                context.getClass()
            ]
        )
        if(isPublic){
            return true;
        }
        
        
        
        const roles: UserType = this.reflector.getAllAndOverride('roles',
            [context.getHandler(), context.getClass()])
            if(!roles || roles.length === 0){
                return false;
            }


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
                
                // if(roles.includes(user.userType)){
                //     request[CURRENT_USER_KEY]=payload;
                //     return true;
                // }
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
