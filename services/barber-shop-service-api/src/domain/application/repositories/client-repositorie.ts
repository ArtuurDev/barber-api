import { Client } from "../../enterprise/entities/client";

export abstract class ClientRepository {
    abstract create(client: Client): Promise<any>
    abstract find(): Promise<Client[] | [] >
    abstract findById(id:string): Promise<Client | null>
    abstract findByEmail(email: string): Promise<boolean>
    abstract findByCpf(cpf: string): Promise<boolean>
    abstract save(data: Client): Promise<any>
    abstract delete(id: string): Promise<Client | undefined>

}