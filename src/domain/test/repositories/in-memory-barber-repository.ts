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

        if(appointmentsOfAppointmentDate.length === 0) { 
            return true
        }

        // Exemplo: se o cliente quiser agendar um serviço de 60 minutos começando às 8h, preciso verificar se todos os horários correspondentes estão livres. 
        // Mesmo que o horário das 8h esteja disponível, se o horário das 8h30 já estiver ocupado, o agendamento deve ser recusado (retornar false).
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