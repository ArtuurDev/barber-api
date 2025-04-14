import { Module } from "@nestjs/common";
import { CreateClientController } from "./create-account-client.controller";
import { DeleteClientController } from "./delete-account-client.controller";
import { AuthenticateClientController } from "./login-client.controller";
import { UploadController } from "./upload-attachments.controller";
import { EditEmailClientController } from "./edit-email-client.controller";
import { CreateClientUseCase } from "services/barber-shop-service-api/src/domain/clients/application/use-cases/create-client-use-case";
import { DeleteClientsUseCase } from "services/barber-shop-service-api/src/domain/clients/application/use-cases/delete-client";
import { AuthenticateClientUseCase } from "services/barber-shop-service-api/src/domain/clients/application/use-cases/authenticate-client";
import { PasswordHash } from "../../../database/repositories/cryptograpy-repository";
import { EditEmailUseCase } from "services/barber-shop-service-api/src/domain/clients/application/use-cases/edit-email-client";
import { UploadAttachmentsUseCase } from "services/barber-shop-service-api/src/domain/clients/application/use-cases/upload-attachments";
import { PrismaAttachmentRepository } from "../../../database/repositories/prisma/prisma-attachments-repositories";
import { PrismaClientAttachment } from "../../../database/repositories/prisma/prisma-clients-attachments";
import { AttachmentRepository } from "services/barber-shop-service-api/src/domain/clients/application/repositories/attachment-repository";
import { Uploader } from "services/barber-shop-service-api/src/domain/clients/application/storage/uploader.repository";
import { StorageR2 } from "../../../storage/storageR2";
import { ClientRepository } from "services/barber-shop-service-api/src/domain/clients/application/repositories/client-repositorie";
import { PrismaClientRepository } from "../../../database/repositories/prisma/prisma-client-repository";
import { CryptograpyRepository } from "services/barber-shop-service-api/src/domain/clients/application/cryptograpy/cryptograpy-repository";
import { ClientAttachmentRepository } from "services/barber-shop-service-api/src/domain/clients/application/repositories/client-attachment-repository";

@Module({
    controllers: 
    [
        CreateClientController, 
        DeleteClientController,
        AuthenticateClientController,
        UploadController,
        EditEmailClientController
    ],
    providers: 
    [
        CreateClientUseCase, 
        DeleteClientsUseCase,
        AuthenticateClientUseCase,
        PasswordHash,
        EditEmailUseCase,
        UploadAttachmentsUseCase, 
         {
            provide: ClientAttachmentRepository,
            useClass: PrismaClientAttachment
        },
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
export class ClientModule {}