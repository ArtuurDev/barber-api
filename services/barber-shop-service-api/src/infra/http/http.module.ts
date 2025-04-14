import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { AuthModule } from "./auth/auth.module";
import { ClientModule } from "./controllers/clients/client.module";
import { AdminModule } from "./controllers/admin/admin.module";

@Module({
    imports: [
    DatabaseModule, 
    AuthModule,
    ClientModule,
    AdminModule
],
})
export class HttpModule {}