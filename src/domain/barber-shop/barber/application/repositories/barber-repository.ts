import { Barber } from "../../enterprise/entities/barber";

export abstract class BarberRepository {
    abstract create(barber: Barber): Promise<any>
    abstract findById(barberId: string): Promise<Barber | undefined>
}