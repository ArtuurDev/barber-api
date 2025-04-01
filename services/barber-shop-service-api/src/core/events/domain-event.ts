import { UniqueEntityId } from "../entitys/unique-entity-id"

export interface DomainEvent {
  ocurredAt: Date
  getAggregateId(): UniqueEntityId
}
