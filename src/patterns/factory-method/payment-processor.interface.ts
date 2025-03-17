import { PaymentDto } from '@app/dtos';

export interface PaymentProcessor {
  processPayment(paymentDto: PaymentDto): Promise<string>;
}
