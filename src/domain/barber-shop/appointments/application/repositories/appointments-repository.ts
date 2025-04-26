import { Appointments } from "../../enterprise/entities/appointments";

export abstract class AppointmentsRepository {
    abstract crete(appointment: Appointments): Promise<Appointments>
}