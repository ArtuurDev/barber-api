import { AppointmentsRepository, isBarberAvailableOnDateAndHourParams } from "src/domain/barber-shop/appointments/application/repositories/appointments-repository";
import { Appointments } from "src/domain/barber-shop/appointments/enterprise/entities/appointments";

export class InMemoryAppointmentRepository implements AppointmentsRepository {
    public items: Appointments[] = []

    async create(appointment: Appointments): Promise<Appointments> {
        this.items.push(appointment)
        return appointment
    }

    async findMany(page?: number): Promise<Appointments[]> {
        
        if(!page) {
            return this.items
        }
        const appointments = this.items.slice((page - 1) * 20, page * 20)
        return appointments
    }

    async isBarberAvailableOnDateAndHour({ appointmentDate, barberId, hours }: isBarberAvailableOnDateAndHourParams): Promise<boolean> {
        
        const appointmentsOfAppointmentDate = this.items
        .filter(appointment => {
            return appointment.appointmentDate.value === appointmentDate.value && 
            appointment.barberId.toValue === barberId
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