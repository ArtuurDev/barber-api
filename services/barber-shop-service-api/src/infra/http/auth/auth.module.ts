import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { Env } from "../../env";

@Module({
    imports: [
        JwtModule.registerAsync({
            inject: [ConfigService],
            global: true,
            useFactory(config: ConfigService<Env>) {
                const SECRET_TOKEN = config.get('SECRET_TOKEN_JWT')
                return {
                    secret: SECRET_TOKEN
                }
            }
    })

],
    exports: [JwtModule]
})
export class AuthModule {}