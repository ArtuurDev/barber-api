import { describe, it } from "vitest";
import { OnClientCreated } from "./on-client-created";
import { makeClient } from "services/barber-shop-service-api/test/factories/make-client";
import { ClientRepository } from "../../../application/repositories/client-repositorie";
import { ClientInMemoryRepository } from "services/barber-shop-service-api/test/repositories/client-in-memory-repository";

describe('on client Created', () => {

    it('shoul send a notification when an client is created', () => {
        const sub = new OnClientCreated()
        const client = makeClient()
        const repository = new ClientInMemoryRepository()
        repository.create(client)
    })

})