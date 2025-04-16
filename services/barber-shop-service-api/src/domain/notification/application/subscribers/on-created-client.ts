// import { DomainEvents } from "services/barber-shop-service-api/src/core/events/domain-events";
// import { EventHandler } from "services/barber-shop-service-api/src/core/events/event-handler";
// import { ClientCreated } from "../../../events/client-created";
// import { SendNotificationUseCase } from "../use-cases/send-notification";
// import { Injectable } from "@nestjs/common";
// import { EmailService } from "services/barber-shop-service-api/src/infra/services/node-mailer";

// @Injectable()
// export class OnCreatedClient implements EventHandler {
    
//     constructor(
//     private sendNotificationUseCase: SendNotificationUseCase,
//     private emailService: EmailService
//     ) {
//        this.setupSubscriptions() 
//     }
    
//     setupSubscriptions(): void {
        
//         DomainEvents.register(this.sendNotification.bind(this), ClientCreated.name)

//     }
    
//     async sendNotification({client}: ClientCreated) {

//         await this.sendNotificationUseCase.execute({
//             content: `Seja muito bem vindo a barberia, ${client.name}`,
//             recipientId: client._id,
//             title: 'Sr.Edgar Barbearia - Boas Vindas',
//             createdAt: new Date()
//         })

//         await this.emailService.sendEmail(
//         client.email,
//         'Sr.Edgar Barbearia - Boas Vindas',
//         `Seja muito bem vindo a barbearia, estamos disponiveis para lhe atender da melhor forma possivel, ${client.name}`,
//         )

//     }

// }