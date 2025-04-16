import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { Env } from "../../env";

@Injectable()
export class AuthGuardMarkEmailvalidated implements CanActivate {
    constructor(
    private jwtService: JwtService,
    private configService: ConfigService<Env>
    ) {
        
    }
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
            const payload = this.jwtService.verify(infos[1], {
                secret: this.configService.get('SECRET_TOKEN_JWT_EMAIL')
            })
            request.user = payload
            return true
        }
        catch(err) {
            throw new UnauthorizedException(err)
        }
    }

}