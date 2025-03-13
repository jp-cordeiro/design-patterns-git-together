import { PaymentDto } from '@app/dtos';
import { PaymentProcessor } from './payment-processor.interface';

export abstract class PaymentFactory {
  abstract createPayment(): Promise<PaymentProcessor>;

  async processPayment(paymentDto: PaymentDto): Promise<string> {
    const payment = await this.createPayment();
    const paymentProcessed = await payment.processPayment(paymentDto.amount);
    return paymentProcessed;
  }
}
