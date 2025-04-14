import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { Roles } from "./enum-role";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
    private readonly jwtService: JwtService,
    private reflactor: Reflector
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const roles = this.reflactor.get(Roles, context.getHandler())
        if(!roles) {
            return true
        }

        const request = context.switchToHttp().getRequest()
        const {authorization} = request.headers
        if(!authorization) {
            throw new UnauthorizedException('Token não informado') 
        }
        try {
            const info: Array<string> = authorization.split(' ')
            if(info.length !== 2 || info[0] !== 'Bearer') {
                throw new UnauthorizedException('Token mal formatado')
            }
            const payload = this.jwtService.verify(info[1])
            request.user = payload
            if(!roles.includes(request.user.permission)) {
                throw new UnauthorizedException()
            }
            return true
        }
        catch(err) {
            throw new UnauthorizedException()
        }
    }
    
}