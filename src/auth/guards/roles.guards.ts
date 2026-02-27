import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { CURRENT_USER_KEY } from 'src/common/constants.ts/constants';
import { Reflector } from '@nestjs/core';
import { UserType } from 'src/auth/Roles/userTypes.roles';
import { JWTPayload } from './auth.guards';

@Injectable()
export class AuthRolesGuard implements CanActivate {
    constructor(
        private readonly jwtService : JwtService,
        private readonly configService : ConfigService,
        private readonly reflector: Reflector,
        
    ){}
    async canActivate(context: ExecutionContext){
        const request : Request & {user:JWTPayload}  = context.switchToHttp().getRequest();
        const requiredRoles: UserType = this.reflector.getAllAndOverride('roles',
            [context.getHandler(), context.getClass()])
            if(!requiredRoles || requiredRoles.length === 0){
                return true;
            }
            if(!requiredRoles.includes(request.user.role)){
                return false;
            }
        
        return true;
    }
}

    
