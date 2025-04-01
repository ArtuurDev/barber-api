import { describe, it, expect} from "vitest";
import { makeClient } from "services/barber-shop-service-api/test/factories/make-client";

describe('domain event - client', () => {



    it('o evento deve ser lançado', () => {
        const client = makeClient()
        expect(client.domainEvents).toHaveLength(1)

    })

})