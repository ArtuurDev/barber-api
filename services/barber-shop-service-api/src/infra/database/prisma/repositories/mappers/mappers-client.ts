import { Prisma, Client as PrismaClient} from "@prisma/client";
import { UniqueEntityId } from "services/barber-shop-service-api/src/core/entitys/unique-entity-id";
import { Client, Client as ClientDomain} from "services/barber-shop-service-api/src/domain/enterprise/entities/client";
export class PrismaMapper {

    static toDomain(client: PrismaClient): ClientDomain {

        return Client.create({
            name: client.name,
            email: client.email,
            password: client.password,
            phone: client.phone,
            cpf: client.cpf,
            birthDateAt: client.birthDateAt,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
        }, new UniqueEntityId(client.id))
    }

    static toPrisma(client: ClientDomain) {

        const clientPrisma: Prisma.ClientUncheckedCreateInput = {
            id: client._id.toValue,
            name: client.name,
            email: client.email,
            password: client.password,
            cpf: client.cpf,
            birthDateAt: client.birthDateAt,
            phone: client.phone,
        }
        return clientPrisma
    }


}