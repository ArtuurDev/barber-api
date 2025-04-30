import { ServiceListRepository } from "src/domain/barber-shop/servicesList/application/repositories/service-list-repository";
import { ServicesList } from "src/domain/barber-shop/servicesList/enterprise/entities/serviceList";

export class InMemoryServiceRepository implements ServiceListRepository {
    public items: ServicesList[] = []
    constructor() {
        
    }

    async create(serviceList: ServicesList): Promise<any> {
        return this.items.push(serviceList)
    }

    async findMany(): Promise<ServicesList[]> {
        return this.items
    }
    
    async verifyServicesBelongToBarber(services: string[], barber: string): Promise<boolean> {
        
        // verificando em cada serviço se o id é igual aos que foram passado por parametro, se sim,
        // se no atributo barber de cada serviço seu id é igual ao parametro barber, add na variavel
        let servicesOfBarber = 0
        for(const item of this.items) {
            if(services.includes(item.id.toValue)) {
                if(item.barbers.some(barberId => barberId.toValue === barber)) {
                    servicesOfBarber++
                }
            }
        }
        // se não for igual, é menor, se for menor, o barber não contém um dos serviços 
        return servicesOfBarber === services.length
    }
}