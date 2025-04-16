import { DomainEvents } from "services/barber-shop-service-api/src/core/events/domain-events";
import { EventHandler } from "services/barber-shop-service-api/src/core/events/event-handler";
import { EmailValidated } from "../../../events/email-validated";
import { EmailService } from "services/barber-shop-service-api/src/infra/services/node-mailer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class OnEmailValidated implements EventHandler {
    setupSubscriptions(): void {
        DomainEvents.register(this.createNotification.bind(this), EmailValidated.name)
    }

    async createNotification({event}: EmailValidated) {

        await this.emailService.sendWelcomeEmail(event.email, 
            'Sr.Edgar Barbearia',
            `Seja muito bem vindo/a a barbearia, estamos certos que vamos lhe entregar o melhor trabalho possivel, ${event.name}`
        )
    }
    constructor(
        private emailService: EmailService
    ) 
    {
        this.setupSubscriptions()
    }

}