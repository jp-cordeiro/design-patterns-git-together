import { PaymentProcessor } from '../factory-method';

export class LoggerPaymentProcessorDecorator implements PaymentProcessor {
  constructor(private readonly wrappedProcessor: PaymentProcessor) {}

  async processPayment(amount: number): Promise<string> {
    console.log(`[LOG] Iniciando processamento do pagamento de R$${amount}`);
    const result = await this.wrappedProcessor.processPayment(amount);
    console.log(`[LOG] Finalizado`);
    return result;
  }
}
