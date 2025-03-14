import {
  LoggerPaymentProcessorDecorator,
  NotifierPaymentProcessorDecorator,
} from '../decorator';
import { PaymentDecoratorFactory } from './payment-decorator-factory';
import { PaymentProcessor } from './payment-processor.interface';

export class LoggerPaymentDecoratorFactory extends PaymentDecoratorFactory {
  decoratePayment(baseProcessor: PaymentProcessor): PaymentProcessor {
    baseProcessor = new LoggerPaymentProcessorDecorator(baseProcessor);
    return baseProcessor;
  }
}

export class NotifyPaymentDecoratorFactory extends PaymentDecoratorFactory {
  decoratePayment(baseProcessor: PaymentProcessor): PaymentProcessor {
    baseProcessor = new NotifierPaymentProcessorDecorator(baseProcessor);
    return baseProcessor;
  }
}

export class FullPaymentDecoratorFactory extends PaymentDecoratorFactory {
  decoratePayment(baseProcessor: PaymentProcessor): PaymentProcessor {
    baseProcessor = new LoggerPaymentProcessorDecorator(baseProcessor);
    baseProcessor = new NotifierPaymentProcessorDecorator(baseProcessor);
    return baseProcessor;
  }
}
