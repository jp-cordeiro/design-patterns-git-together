import { PAYMENT_TYPE } from '@app/enums';

export class PaymentDto {
  amount: number;
  type?: PAYMENT_TYPE;
}
