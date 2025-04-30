import { BarberRepository } from "src/domain/barber-shop/barber/application/repositories/barber-repository";
import { Barber } from "src/domain/barber-shop/barber/enterprise/entities/barber";

export class InMemoryBarberRepository implements BarberRepository {
    public items: Barber[] = []
    
    constructor() {}

    async findByCpf(cpf: string): Promise<Barber | undefined> {
        return this.items.find(item => item.cpf.value === cpf)
    }
    async findByEmail(email: string): Promise<Barber | undefined> {
        return this.items.find(item => item.email.value === email)
    }
    async findByNumberPhone(numberPhone: string): Promise<Barber | undefined> {
        return this.items.find(item => item.numberPhone.value === numberPhone)
    }

    async create(barber: Barber): Promise<any> {
        return this.items.push(barber)
    }

    async findMany(): Promise<Barber[]> {
        return this.items
    }

    async findById(barberId: string): Promise<Barber | undefined> {
        return this.items.find(item => item.id.toValue === barberId)
    }
}