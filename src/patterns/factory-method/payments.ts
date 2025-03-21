import { PaymentProcessor } from './payment-processor.interface';
import { PaymentGatewayAdapterInterface } from '../adapter';
import { PaymentDto } from '@app/dtos';

export class PixPayment implements PaymentProcessor {
  async processPayment(paymentDto: PaymentDto): Promise<string> {
    const { amount } = paymentDto;
    console.log(`Verificando dados do pagamento ....`);
    console.log(`Pagando R$ ${amount} com PIX`);
    return `Foi pago R$ ${amount} por PIX`;
  }
}

export class BoletoPayment implements PaymentProcessor {
  async processPayment(paymentDto: PaymentDto): Promise<string> {
    const { amount } = paymentDto;
    console.log(`Validando dados do boleto ....`);
    console.log(`Pagando R$ ${amount} com BOLETO`);
    return `Foi pago R$ ${amount} por BOLETO`;
  }
}

export class CreditCardPayment implements PaymentProcessor {
  constructor(
    private readonly paymentGatewayAdapter: PaymentGatewayAdapterInterface,
  ) {}
  async processPayment(paymentDto: PaymentDto): Promise<string> {
    const { amount } = paymentDto;
    console.log(`Validando dados do cartão de crédito ....`);
    const response =
      await this.paymentGatewayAdapter.processPayment(paymentDto);
    console.log(response);
    return `Foi pago R$ ${amount} por CARTÃO DE CRÉDITO`;
  }
}
