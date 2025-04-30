import { UniqueEntityId } from "src/core/entitys/unique-entity-id"
import { ServicesList } from "../../enterprise/entities/serviceList"
import { ServiceListRepository } from "../repositories/service-list-repository"
import { right } from "src/core/either"

export interface CreateServiceUseCaseRequest {
    name: string
    durationInMinutes: number
    barbers: string[]
}

export class CreateServiceUseCase {
    constructor(
        private serviceRepository: ServiceListRepository
    ) {}

    async execute({
        barbers,
        durationInMinutes,
        name
    }: CreateServiceUseCaseRequest) {

        const service = ServicesList.create({
            barbers: barbers.map(item => new UniqueEntityId(item)),
            durationInMinutes,
            name
        })

        await this.serviceRepository.create(service)

        return right({
            service
        })

    }

}