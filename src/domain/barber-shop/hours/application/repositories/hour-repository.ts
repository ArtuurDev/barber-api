import { Hours } from "../../enterprise/entities/hours";

export abstract class HourRepository {
    abstract create(hour: Hours): Promise<any>
}