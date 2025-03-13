import { PAYMENT_TYPE } from '@app/enums/payment-type.enum';

export class PaymentDto {
  amount: number;
  type?: PAYMENT_TYPE;
}
