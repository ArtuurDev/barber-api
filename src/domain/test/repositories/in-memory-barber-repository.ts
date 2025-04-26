import { BarberRepository, isBarberAvailableOnDateAndHourParams } from "src/domain/barber-shop/barber/application/repositories/barber-repository";
import { Barber } from "src/domain/barber-shop/barber/enterprise/entities/barber";
import { InMemoryAppointmentRepository } from "./in-memory-appointments-repository";

export class InMemoryBarberRepository implements BarberRepository {
    public items: Barber[] = []
    
    constructor(
        private appointmentRepository: InMemoryAppointmentRepository, 
    ) {}

    async create(barber: Barber): Promise<any> {
        return this.items.push(barber)
        
    }
    async findById(barberId: string): Promise<Barber | undefined> {
        return this.items.find(item => item.id.toValue === barberId)
    }

    async isBarberAvailableOnDateAndHour({ appointmentDate, barberId, hours }: isBarberAvailableOnDateAndHourParams): Promise<boolean> {
        
        const appointmentsOfAppointmentDate = this.appointmentRepository.items.filter(appointment => {
            return appointment.appointmentDate.value === appointmentDate.value && appointment.barberId.toValue === barberId
        })

        if(appointmentsOfAppointmentDate.length === 0) { // fazendo essa veri para se for um array vazio não continuar o codigo e pra corrigir a lógica do caso de uso, pq tava retornando array vazio e eu tava vericando se era false mais array vazio é true
            return true
        }

        for(const appointment of appointmentsOfAppointmentDate) {
            for(const hour of hours) {
                if(appointment.hours.find(item => item.toValue === hour.toValue)) {
                    return false
                }
            }
        }
        return true
    }
}