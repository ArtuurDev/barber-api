import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        JwtModule.register({
        secret: '12;.,345--6543212343-5-e-sedesedfrtrertttfcvaaqaw2134qws-qqqaa212121',
        signOptions: {
            expiresIn: '2 days'
        }
    })

],
    exports: [JwtModule]
})
export class AuthModule {}