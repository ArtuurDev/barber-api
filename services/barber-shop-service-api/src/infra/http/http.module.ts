import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { CreateClientController } from "./controllers/clients/create-client.controller";
import { ClientRepository } from "../../domain/application/repositories/client-repositorie";
import { PrismaClientRepository } from "../database/repositories/prisma/prisma-client-repository";
import { CreateClientUseCase } from "../../domain/application/use-cases/create-client-use-case";
import { GetClientsController } from "./controllers/clients/list-clients-controller";
import { GetClientsUseCase } from "../../domain/application/use-cases/get-clients";
import { DeleteClientController } from "./controllers/clients/delete-client.controller";
import { DeleteClientsUseCase } from "../../domain/application/use-cases/delete-client";
import { AuthModule } from "./auth/auth.module";
import { AuthenticateClientController } from "./controllers/clients/authenticate-client.controller";
import { AuthenticateClientUseCase } from "../../domain/application/use-cases/authenticate-client";
import { PasswordHashRepository } from "../../domain/application/repositories/password-hash-repository";
import { PasswordHash } from "../database/repositories/password-hash-repository";

@Module({
    imports: [
    DatabaseModule, 
    AuthModule,
],
    controllers: [
    CreateClientController, 
    GetClientsController, 
    DeleteClientController,
    AuthenticateClientController
],
    providers: [
        CreateClientUseCase, 
        GetClientsUseCase, 
        DeleteClientsUseCase,
        AuthenticateClientUseCase,
        PasswordHash,
        {
        provide: ClientRepository,
        useClass: PrismaClientRepository
        },
        {
            provide: PasswordHashRepository,
            useClass: PasswordHash
        }
    ]
})
export class HttpModule {}