import {
  LoggerPaymentProcessorDecorator,
  NotifierPaymentProcessorDecorator,
} from '../decorator';
import { PaymentProcessor } from '../factory-method';
import { PaymentDecoratorsAdapterInterface } from './payment-decorator-adapter.interface';

export class PaymentDecoratorsAdapter
  implements PaymentDecoratorsAdapterInterface
{
  constructor() {}
  decorate(payment: PaymentProcessor): PaymentProcessor {
    payment = new LoggerPaymentProcessorDecorator(payment);
    payment = new NotifierPaymentProcessorDecorator(payment);
    return payment;
  }
}
