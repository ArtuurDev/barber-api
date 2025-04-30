import { Either, right } from "src/core/either"
import { Barber } from "../../enterprise/entities/barber"
import { BarberRepository } from "../repositories/barber-repository"

export type ListBarberUseCaseResponse = Either<null,
{
    barbers: Barber[]
}>

export class ListBarbersUseCase {
    constructor(
        private barberRepository: BarberRepository
    ) {}

    async execute() {

        const barbers = await this.barberRepository.findMany()
        return right({
            barbers
        })

    }

}