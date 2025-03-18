import { ClientRepository } from "services/barber-shop-service-api/src/domain/application/repositories/client-repositorie";
import { Client } from "services/barber-shop-service-api/src/domain/enterprise/entities/client";
import { PrismaService } from "../prisma.service";
import { PrismaMapper } from "./mappers/mappers-client";
import { Injectable } from "@nestjs/common";


@Injectable()
export class PrismaClientRepository implements ClientRepository {
    
    constructor(
    private readonly prisma: PrismaService
    ) {}

    async create(client: Client): Promise<any> {
        const data = PrismaMapper.toPrisma(client)

        await this.prisma.client.create({
            data
        })
    }


    async find(): Promise<Client[] | []> {

        const data = await this.prisma.client.findMany()

        const clients = data.map(item => PrismaMapper.toDomain(item))

        return clients
    }


    async findById(id: string): Promise<Client | null> {
        
        const client = await this.prisma.client.findUnique({
            where: {
                id
            }
        })

        if(!client) {
            return null
        }

        return PrismaMapper.toDomain(client)
    }


    async findByEmail(email: string): Promise<Client | null> {
        
        const client = await this.prisma.client.findUnique({
            where: {
                email
            }
        })

        if(!client) {
            return null
        }

        return PrismaMapper.toDomain(client)
    }


    async findByCpf(cpf: string): Promise<Client | null> {
        
        const client = await this.prisma.client.findUnique({
            
            where: {
                cpf
            }
        })

        if(!client) {
            return null
        }

        return PrismaMapper.toDomain(client)
    }

    async findByPhone(phone: string): Promise<Client | null> {
        
        const client = await this.prisma.client.findFirst({
            where: {
                phone
            }
        })

        if(!client) {
            return null
        }

        return PrismaMapper.toDomain(client)

    }
    
    async save(client: Client) {
        const data = PrismaMapper.toPrisma(client)

        await this.prisma.client.update({
            where: {
                id: data.id
            },
            data
        })

    }


    delete(id: string): Promise<Client | undefined> {
        throw new Error("Method not implemented.")
    }

}