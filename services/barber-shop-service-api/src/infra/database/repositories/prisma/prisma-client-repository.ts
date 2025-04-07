
import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { PrismaMapper } from "../mappers/mappers-client";
import { Client as PrismaClient } from "@prisma/client";
import { Client } from "services/barber-shop-service-api/src/domain/clients/enterprise/entities/client";
import { ClientRepository } from "services/barber-shop-service-api/src/domain/clients/application/repositories/client-repositorie";


@Injectable()
export class PrismaClientRepository implements ClientRepository {
    
    constructor(
    private readonly prisma: PrismaService
    ) {}

    async create(client: Client): Promise<any> {
        const data = PrismaMapper.toPrisma(client)

        return this.prisma.client.create({
            data
        })
        
    }

    async authenticate(email: string, password: string): Promise<PrismaClient | null> {
        
        const client = await this.prisma.client.findFirst({
            where: {
                email, 
                password
            }
        })

        return client

    }

    async findByPassword(password: string, id: string): Promise<Client | null> {
        
        const client = await this.prisma.client.findFirst({
            where: {
                id,
                password
            }
        })

        if(!client) {
            return null
        }

        return PrismaMapper.toDomain(client)

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

        return this.prisma.client.update({
            where: {
                id: data.id
            },
            data
        })

    }


    async delete(id: string): Promise<any> {

        const client = this.prisma.client.delete({
            where: {
                id
            }
        })

        if(!client) return null

        return client

    }

}