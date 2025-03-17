import { PaymentDto, PaymentDtoVisa } from '@app/dtos';

export interface PaymentGatewayAdapterInterface {
  processPayment(paymentDto: PaymentDto): Promise<string>;
}

export interface PaymentGatewayVisaAdpterInterface
  extends PaymentGatewayAdapterInterface {
  processPayment(paymentDto: PaymentDtoVisa): Promise<string>;
}
