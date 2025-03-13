import {
  MasterCardPaymentGateway,
  VisaProcessPaymentGateway,
} from './gateway.libs';
import { PaymentGatewayAdapterInterface } from './payment-gateway-adapter.interface';

export class PaymentVisaGatewayAdapter
  implements PaymentGatewayAdapterInterface
{
  async processPayment(amount: number): Promise<string> {
    const visaProcessPaymentGateway = new VisaProcessPaymentGateway();
    const response = await visaProcessPaymentGateway.processVisaPayment(amount);
    return response;
  }
}

export class PaymentMasterCardGatewayAdapter
  implements PaymentGatewayAdapterInterface
{
  async processPayment(amount: number): Promise<string> {
    const masterCardPaymentGateway = new MasterCardPaymentGateway();
    const response = await masterCardPaymentGateway.masterCardPayment(amount);
    return response;
  }
}
