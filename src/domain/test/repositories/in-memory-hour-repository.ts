import { AppointmentsRepository } from "src/domain/barber-shop/appointments/application/repositories/appointments-repository";
import { CalculateNumberIdsHoursAppointmentParams, HourRepository, listAvailableHoursOfBarberOnChosenDate } from "src/domain/barber-shop/hours/application/repositories/hour-repository";
import { CalculateNumberIdsHoursAppointmentRequest } from "src/domain/barber-shop/hours/application/use-cases/calculate-number-ids-hours-appointment";
import { Hours } from "src/domain/barber-shop/hours/enterprise/entities/hours";

export class InMemoryHourRepository implements HourRepository {
    
    public items: Hours[] = []

    constructor(
        private appointmentRepository: AppointmentsRepository,
    ) {}

    async create(hour: Hours): Promise<any> {
        return this.items.push(hour)
    }
    async findMany(): Promise<Hours[]> {
        return this.items
    }

    async calculateNumberIdsHoursAppointment({ 
        hourInitialId, 
        hoursBarbersId, 
        serviceDuration 
      }: CalculateNumberIdsHoursAppointmentParams): Promise<string[] | false> {
      
        // Define a duração fixa de cada horário (30 minutos por slot)
        const minuteService = 30
      
        // Calcula quantos horários (slots) são necessários para o serviço
        // Ex: serviço de 60 min -> 60 / 30 = 2 slots
        const slots = serviceDuration / minuteService
      
        // Procura o índice do horário inicial dentro da lista de horários disponíveis do barbeiro
        const indexInitialOfHours = hoursBarbersId.findIndex(item => item === hourInitialId)
      
        if (indexInitialOfHours === -1) {
          return false
        }
      
        // Corta a lista a partir do horário inicial até completar o número de slots necessários
        const hours = hoursBarbersId.slice(indexInitialOfHours, indexInitialOfHours + slots)        
        
        return hours
      }
      

    async listAvailableHoursOfBarberOnChosenDate({ barberId, dateAppointment }: listAvailableHoursOfBarberOnChosenDate): Promise<string[]> {
        
        // adicionando os agendamentos correspondentes
        const appointmentsDateOfBarber = (await this.appointmentRepository.findMany())
        .filter(item => item.barberId.toValue === barberId && 
            item.appointmentDate.value === dateAppointment)
        // itererando sobre cada agendamento e sobre cada horário do agendamento e adiconando na var tofo horario que ja está agendado
        const bookedHourIds: string[] = []
        for(const appointment of appointmentsDateOfBarber) {
            for(const hour of appointment.hours) {
                bookedHourIds.push(hour.toValue)
            }
        }

        // iterando horários que ja estão agendados e verficando quais os horarios da tabel não estão nele e retornando
        const hourOfbarber = this.items.filter(item => !bookedHourIds.includes(item.id.toValue)) 
        const hourOfbarberString = hourOfbarber.map(item => item.id.toValue)
        return hourOfbarberString
    }
}