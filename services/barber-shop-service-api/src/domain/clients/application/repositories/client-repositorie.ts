import { Client } from "../../enterprise/entities/client";
import { Client as PrismaClient } from "@prisma/client";
export abstract class ClientRepository {
    abstract create(client: Client): Promise<any>
    abstract find(): Promise<Client[] | [] >
    abstract findById(id:string): Promise<Client | null>
    abstract findByEmail(email: string): Promise<Client | null>
    abstract findByPassword(password: string, id: string): Promise<Client | null>
    abstract findByPhone(phone: string): Promise<Client | null>
    abstract findByCpf(cpf: string): Promise<Client | null>
    abstract save(data: Client): Promise<any>
    abstract delete(id: string): Promise<any>
    abstract authenticate(email: string): Promise<PrismaClient | null>
    abstract editEmail(id: string, email: string): Promise<any>
}