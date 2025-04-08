import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { CreateClientController } from "./controllers/clients/create-client.controller";
import { PrismaClientRepository } from "../database/repositories/prisma/prisma-client-repository";
import { GetClientsController } from "./controllers/clients/list-clients-controller";
import { DeleteClientController } from "./controllers/clients/delete-client.controller";
import { AuthModule } from "./auth/auth.module";
import { AuthenticateClientController } from "./controllers/clients/authenticate-client.controller";
import { PasswordHash } from "../database/repositories/cryptograpy-repository";
import { CreateClientUseCase } from "../../domain/clients/application/use-cases/create-client-use-case";
import { GetClientsUseCase } from "../../domain/clients/application/use-cases/get-clients";
import { DeleteClientsUseCase } from "../../domain/clients/application/use-cases/delete-client";
import { AuthenticateClientUseCase } from "../../domain/clients/application/use-cases/authenticate-client";
import { ClientRepository } from "../../domain/clients/application/repositories/client-repositorie";
import { CryptograpyRepository } from "../../domain/clients/application/cryptograpy/cryptograpy-repository";
import { UploadController } from "./controllers/clients/upload-attachments.controller";
import { EditEmailClientController } from "./controllers/clients/edit-email-client.controller";
import { EditEmailUseCase } from "../../domain/clients/application/use-cases/edit-email-client";
import { UploadAttachmentsUseCase } from "../../domain/clients/application/use-cases/upload-attachments";
import { Uploader } from "../../domain/clients/application/storage/uploader.repository";
import {  StorageR2 } from "../storage/storageR2";
import { PrismaAttachmentRepository } from "../database/repositories/prisma/prisma-attachments-repositories";
import { AttachmentRepository } from "../../domain/clients/application/repositories/attachment-repository";

@Module({
    imports: [
    DatabaseModule, 
    AuthModule,
],
    controllers: [
    CreateClientController, 
    GetClientsController, 
    DeleteClientController,
    AuthenticateClientController,
    UploadController,
    EditEmailClientController,
    UploadController
],
    providers: [
        CreateClientUseCase, 
        GetClientsUseCase, 
        DeleteClientsUseCase,
        AuthenticateClientUseCase,
        PasswordHash,
        EditEmailUseCase,
        UploadAttachmentsUseCase, 
        PrismaAttachmentRepository,
        {
            provide: AttachmentRepository,
            useClass: PrismaAttachmentRepository
        },
        {
            provide: Uploader,
            useClass: StorageR2
        },
        {
        provide: ClientRepository,
        useClass: PrismaClientRepository
        },
        {
            provide: CryptograpyRepository,
            useClass: PasswordHash
        }
    ]
})
export class HttpModule {}