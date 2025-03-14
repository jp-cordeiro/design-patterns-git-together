import { PaymentProcessor } from '../factory-method';

export class NotifierPaymentProcessorDecorator implements PaymentProcessor {
  constructor(private readonly wrappedProcessor: PaymentProcessor) {}

  async processPayment(amount: number): Promise<string> {
    const result = await this.wrappedProcessor.processPayment(amount);
    console.log(`[NOTIFICAÇÃO] Enviando e-mail de confirmação`);
    return result;
  }
}
