import { ServicesList } from "../../enterprise/entities/serviceList";

export abstract class ServiceListRepository {
    abstract create(serviceList: ServicesList): Promise<any>
    abstract verifyServicesBelongToBarber(services: string[], barber: string): Promise<boolean>
    abstract findMany(): Promise<ServicesList[]>
}
