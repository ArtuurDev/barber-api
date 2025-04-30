import { right } from "src/core/either";
import { ServiceListRepository } from "../repositories/service-list-repository";

export class ListServiceUseCase {
    constructor(
        private serviceRepository: ServiceListRepository
    ) {}

    async execute() {

        const services = await this.serviceRepository.findMany()
        return right({
            services
        })

    }

}