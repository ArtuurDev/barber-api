import { Either, right } from "src/core/either";
import { HourRepository } from "../repositories/hour-repository";
import { Hours } from "../../enterprise/entities/hours";

export interface CreateHoursUseCaseRequest {
    days: number[]
    hour: string
}

export type CreateHoursUseCaseResponse = Either<null, {
    hour: Hours
}>

export class CreateHoursUseCase {
    constructor(
        private hourRepository: HourRepository
    ) {}

    async execute({ days, hour }: CreateHoursUseCaseRequest): Promise<CreateHoursUseCaseResponse> {

        const hourIntance = Hours.create({
            hour,
            days,
        })
        await this.hourRepository.create(hourIntance)
        
        return right({
            hour
        })

    }

}