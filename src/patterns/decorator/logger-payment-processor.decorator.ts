import { PaymentDto } from '@app/dtos';
import { PaymentProcessor } from '../factory-method';

export class LoggerPaymentProcessorDecorator implements PaymentProcessor {
  constructor(private readonly wrappedProcessor: PaymentProcessor) {}

  async processPayment(paymentDto: PaymentDto): Promise<string> {
    const { amount } = paymentDto;
    console.log(`[LOG] Iniciando processamento do pagamento de R$${amount}`);
    const result = await this.wrappedProcessor.processPayment(paymentDto);
    console.log(`[LOG] Finalizado`);
    return result;
  }
}
