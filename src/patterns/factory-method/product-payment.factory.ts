import { PaymentFactory } from './payment-factory';
import { PaymentProcessor } from './payment-processor.interface';
import { BoletoPayment, CreditCardPayment, PixPayment } from './payments';

export class PixPaymentFactory extends PaymentFactory {
  async createPayment(): Promise<PaymentProcessor> {
    const pixPayment = new PixPayment();
    return pixPayment;
  }
}

export class CreditCardPaymentFactory extends PaymentFactory {
  async createPayment(): Promise<PaymentProcessor> {
    const creditCardPayment = new CreditCardPayment();
    return creditCardPayment;
  }
}

export class BoletoPaymentFactory extends PaymentFactory {
  async createPayment(): Promise<PaymentProcessor> {
    const boletoPayment = new BoletoPayment();
    return boletoPayment;
  }
}
