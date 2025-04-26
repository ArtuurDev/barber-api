import { AppointmentsRepository } from "src/domain/barber-shop/appointments/application/repositories/appointments-repository";
import { Appointments } from "src/domain/barber-shop/appointments/enterprise/entities/appointments";

export class InMemoryAppointmentRepository implements AppointmentsRepository {
    public items: Appointments[] = []

    async crete(appointment: Appointments): Promise<Appointments> {
        this.items.push(appointment)
        return appointment
    }
  
}