import { Module } from "@nestjs/common";
//import { SendNotificationUseCase } from "../../domain/notification/application/use-cases/send-notification";
// import { OnCreatedClient } from "../../domain/notification/application/subscribers/on-created-client";
//import { NotificationRepository } from "../../domain/notification/application/reposiotories/notifications-repository";
//import { PrismaNotificationRepository } from "../database/repositories/prisma/prisma-notification-repository";
import { EmailService } from "../services/node-mailer";
import { OnEmailValidated } from "../../domain/notification/application/subscribers/on-email-validated";

@Module({
    providers: [
        OnEmailValidated,
        //SendNotificationUseCase,
        // OnCreatedClient,
        EmailService, 
        //{
            //provide: NotificationRepository,
            //useClass: PrismaNotificationRepository
        //}
    ]
})
export class EventsModule {} 