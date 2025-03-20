import { Barber } from "./barber";
import { Client } from "./client";
import { Schedulling } from "./schedulling";
import { Services } from "./services";

export interface AppointmentsProps {
    client_id: Client
    barber_id: Barber
    schedullings_id: Schedulling[] // horarios
    services_id: Services[] // serviços
    date: Date
    amount: number // preço final
    createdAt: Date
    updatedAt: Date
}
export class Appoitments {

}