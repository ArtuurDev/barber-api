import { Appoitments } from "./appointments"
import { Services } from "./services"

export interface BarberPorps {
    name: string
    email: string
    phone: string
    images?: string[]
    active: boolean
    description?: string
    appointments_id: Appoitments[]
    services_id: Services[]
}

export class Barber {
    
}