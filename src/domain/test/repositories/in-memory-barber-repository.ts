import { BarberRepository } from "src/domain/barber-shop/barber/application/repositories/barber-repository";
import { Barber } from "src/domain/barber-shop/barber/enterprise/entities/barber";
import { InMemoryAppointmentRepository } from "./in-memory-appointments-repository";

export class InMemoryBarberRepository implements BarberRepository {
    public items: Barber[] = []
    
    constructor() {}

    async create(barber: Barber): Promise<any> {
        return this.items.push(barber)
        
    }
    async findById(barberId: string): Promise<Barber | undefined> {
        return this.items.find(item => item.id.toValue === barberId)
    }
}