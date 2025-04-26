import { Entity } from "src/core/entitys/entity";
import { UniqueEntityId } from "src/core/entitys/unique-entity-id";
import { Optional } from "src/core/types/optional";
import { DateVo } from "src/domain/value-objects/date";

interface AppointmentsProps {
    customerId: UniqueEntityId
    barberId: UniqueEntityId
    appointmentDate: DateVo // Data
    hours: UniqueEntityId[] 
    services: UniqueEntityId[]
    status: 'pending' | 'completed' | 'canceled';
    paymentMethod: 'cash' | 'credit_card' | 'debit'
    totalPrice: number // preço total do agendamento
    notes?: string | null// Observações ou notas
    createdAt: Date
    updatedAt?: Date | null
    canceled: boolean // Caso tenha sido cancelado
  }
  
export class Appointments extends Entity<AppointmentsProps> {

    private constructor(props: AppointmentsProps, id?:UniqueEntityId ) {
      super(props, id)
    }

    static create(props: Optional<AppointmentsProps, 'createdAt' | 'status' | 'canceled'>, id?: UniqueEntityId) {
      return new Appointments({
        ...props,
        notes: props.notes ?? null,
        status: 'pending',
        createdAt: new Date,
        updatedAt: props.updatedAt ?? null,
        canceled: false
      }, id)
    }

    get customerId() {
      return this.props.customerId
    }
    get barberId() {
      return this.props.barberId
    }
    get appointmentDate() {
      return this.props.appointmentDate
    }
    get hours() {
      return this.props.hours
    }
    get services() {
      return this.props.services
    }
    get status() {
      return this.props.status
    }
    get paymentMethod() {
      return this.props.paymentMethod
    }
    get totalPrice() {
      return this.props.totalPrice
    }
    get notes() {
      return this.props.notes
    }
    get canceled() {
      return this.props.canceled
    }
}

