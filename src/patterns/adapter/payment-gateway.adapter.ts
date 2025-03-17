import { PaymentDto, PaymentDtoVisa } from '@app/dtos';
import {
  MasterCardPaymentGateway,
  NewVisaProcessPaymentGateway,
  VisaProcessPaymentGateway,
} from './gateway.libs';
import {
  PaymentGatewayAdapterInterface,
  PaymentGatewayVisaAdpterInterface,
} from './payment-gateway-adapter.interface';

export class PaymentVisaGatewayAdapter
  implements PaymentGatewayAdapterInterface
{
  async processPayment(paymentDto: PaymentDto): Promise<string> {
    const { amount } = paymentDto;
    const visaProcessPaymentGateway = new VisaProcessPaymentGateway();
    const response = await visaProcessPaymentGateway.processVisaPayment(amount);
    return response;
  }
}

export class PaymentNewVisaGatewayAdapter
  implements PaymentGatewayVisaAdpterInterface
{
  async processPayment(paymentDto: PaymentDtoVisa): Promise<string> {
    const { amount, installments } = paymentDto;
    const visaProcessPaymentGateway = new NewVisaProcessPaymentGateway();
    const response = await visaProcessPaymentGateway.processVisaPayment(
      amount,
      installments,
    );
    return response;
  }
}

export class PaymentMasterCardGatewayAdapter
  implements PaymentGatewayAdapterInterface
{
  async processPayment(paymentDto: PaymentDto): Promise<string> {
    const { amount } = paymentDto;
    const masterCardPaymentGateway = new MasterCardPaymentGateway();
    const response = await masterCardPaymentGateway.masterCardPayment(amount);
    return response;
  }
}
