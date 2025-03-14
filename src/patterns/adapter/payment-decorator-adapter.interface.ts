import { PaymentProcessor } from '../factory-method';

export interface PaymentDecoratorsAdapterInterface {
  decorate(payment: PaymentProcessor): PaymentProcessor;
}
