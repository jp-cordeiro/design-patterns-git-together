import { PaymentProcessor } from './payment-processor.interface';

export abstract class PaymentDecoratorFactory {
  abstract decoratePayment(baseProcessor: PaymentProcessor): PaymentProcessor;
}
