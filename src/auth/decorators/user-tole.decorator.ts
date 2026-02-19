import { SetMetadata } from "@nestjs/common"; 
import { UserType } from "../Roles/userTypes.roles";


export const Roles = (...roles: UserType[]) =>SetMetadata('roles', roles); 