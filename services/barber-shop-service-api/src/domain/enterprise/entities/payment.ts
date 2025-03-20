import { Client } from "./client"

export interface PaymentProps {
    client_id: Client
    amount:        number  // Valor do pagamento
    currency:      string  // Moeda (ex: BRL, USD, EUR)
    status:        string  // pending, paid, failed, refunded
    paymentMethod: string   // Método de pagamento (credit_card, pix, boleto, etc.)
    transactionId: string  // ID da transação no gateway de pagamento
    description:   String  // Descrição do pagamento (opcional)
    
    // Datas de controle
    createdAt:     Date
    updatedAt:     Date
  
    // Relacionamento com cliente
    
}
export class Payment {}