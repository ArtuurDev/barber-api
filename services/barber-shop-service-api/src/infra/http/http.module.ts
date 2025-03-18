import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { CreateClientController } from "./controllers/clients/create-client.controller";
import { ClientRepository } from "../../domain/application/repositories/client-repositorie";
import { PrismaClientRepository } from "../database/prisma/repositories/prisma-client-repository";
import { CreateClientUseCase } from "../../domain/application/use-cases/create-client-use-case";

@Module({
    imports: [DatabaseModule],
    controllers: [CreateClientController],
    providers: [CreateClientUseCase, {
        provide: ClientRepository,
        useClass: PrismaClientRepository
    }]
})
export class HttpModule {}