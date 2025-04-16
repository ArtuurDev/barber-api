import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuardEmailvalidated implements CanActivate {
    constructor(
    private jwtService: JwtService
) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        
        const request = context.switchToHttp().getRequest()

        const authorization = request.headers.authorization
        if(!authorization) {
            throw new UnauthorizedException('Token é obrigatorio')
        }

        const infos: Array<string> = authorization.split(' ')
        if(infos.length < 2 || infos[0] !== 'Bearer') {
            throw new UnauthorizedException('Token mal formatado')
        }

        try {
            const payload = this.jwtService.verify(infos[1])
            request.user = payload
            return true
        }
        catch(err) {
            throw new UnauthorizedException(err)
        }
    }

}