import { Barber } from "../../enterprise/entities/barber";

export abstract class BarberRepository {
    abstract create(barber: Barber): Promise<any>
    abstract findMany(): Promise<Barber[]>
    abstract findById(barberId: string): Promise<Barber | undefined>
    abstract findByCpf(cpf: string): Promise<Barber | undefined>
    abstract findByEmail(email: string): Promise<Barber | undefined>
    abstract findByNumberPhone(numberPhone: string): Promise<Barber | undefined>
}