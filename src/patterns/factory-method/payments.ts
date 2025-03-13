import { PAYMENT_TYPE } from '@app/enums/payment-type.enum';
import { PaymentProcessor } from './payment-processor.interface';

export class PixPayment implements PaymentProcessor {
  async processPayment(amount: number): Promise<string> {
    console.log(`Verificando dados do pagamento ....`);
    console.log(`Pagando R$ ${amount} com PIX`);
    return `Foi pago R$ ${amount} por ${PAYMENT_TYPE.PIX}`;
  }
}

export class BoletoPayment implements PaymentProcessor {
  async processPayment(amount: number): Promise<string> {
    console.log(`Validando dados do boleto ....`);
    console.log(`Pagando R$ ${amount} com BOLETO`);
    return `Foi pago R$ ${amount} por ${PAYMENT_TYPE.BOLETO}`;
  }
}

export class CreditCardPayment implements PaymentProcessor {
  async processPayment(amount: number): Promise<string> {
    console.log(`Validando dados do cartão de crédito ....`);
    console.log(`Conectando ao gateway de pagamento ....`);
    console.log(`Pagando R$ ${amount} com CARTÃO DE CRÉDITO`);
    return `Foi pago R$ ${amount} por ${PAYMENT_TYPE.CREDIT_CARD}`;
  }
}
