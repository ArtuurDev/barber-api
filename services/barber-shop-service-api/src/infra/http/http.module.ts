import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { CreateClientController } from "./controllers/clients/create-client.controller";
import { ClientRepository } from "../../domain/application/repositories/client-repositorie";
import { PrismaClientRepository } from "../database/prisma/repositories/prisma-client-repository";
import { CreateClientUseCase } from "../../domain/application/use-cases/create-client-use-case";
import { GetClientsController } from "./controllers/clients/list-clients-controller";
import { GetClientsUseCase } from "../../domain/application/use-cases/get-clients";
import { UpdateClientController } from "./controllers/clients/update-clients.controller";
import { UpdateClientUseCase } from "../../domain/application/use-cases/update-client";
import { DeleteClientController } from "./controllers/clients/delete-client.controller";
import { DeleteClientsUseCase } from "../../domain/application/use-cases/delete-client";

@Module({
    imports: [DatabaseModule],
    controllers: [
    CreateClientController, 
    GetClientsController, 
    UpdateClientController,
    DeleteClientController
],
    providers: [
        CreateClientUseCase, 
        GetClientsUseCase, 
        UpdateClientUseCase,
        DeleteClientsUseCase, 
        {
        provide: ClientRepository,
        useClass: PrismaClientRepository
        }
    ]
})
export class HttpModule {}