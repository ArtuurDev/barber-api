import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { CreateClientController } from "./controllers/create-client.controller";

@Module({
    imports: [DatabaseModule],
    controllers: [CreateClientController]
})
export class HttpModule {}