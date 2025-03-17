import { PaymentDto } from '@app/dtos';
import { PaymentProcessor } from '../factory-method';

export class NotifierPaymentProcessorDecorator implements PaymentProcessor {
  constructor(private readonly wrappedProcessor: PaymentProcessor) {}

  async processPayment(paymentDto: PaymentDto): Promise<string> {
    const result = await this.wrappedProcessor.processPayment(paymentDto);
    console.log(`[NOTIFICAÇÃO] Enviando e-mail de confirmação`);
    return result;
  }
}
