import { Module } from "@nestjs/common";
import { GetClientsController } from "./list-clients-controller";
import { GetClientsUseCase } from "services/barber-shop-service-api/src/domain/clients/application/use-cases/get-clients";
import { ClientRepository } from "services/barber-shop-service-api/src/domain/clients/application/repositories/client-repositorie";
import { PrismaClientRepository } from "../../../database/repositories/prisma/prisma-client-repository";
import { ClientAttachmentRepository } from "services/barber-shop-service-api/src/domain/clients/application/repositories/client-attachment-repository";
import { PrismaClientAttachment } from "../../../database/repositories/prisma/prisma-clients-attachments";

@Module({
    controllers: 
    [
        GetClientsController
    ],
    providers: 
    [
        GetClientsUseCase,
    {
        provide: ClientRepository,
        useClass: PrismaClientRepository
    }, 
    {
        provide: ClientAttachmentRepository,
        useClass: PrismaClientAttachment
    }
    ]
})
export class AdminModule {}