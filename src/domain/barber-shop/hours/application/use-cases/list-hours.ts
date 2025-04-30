import { right } from "src/core/either";
import { HourRepository } from "../repositories/hour-repository";

export class ListHoursUseCase {
    constructor(
        private hourRepository: HourRepository
    ) {}

    async execute() {

        const hours = await this.hourRepository.findMany()
        return right({
            hours
        })

    }

}