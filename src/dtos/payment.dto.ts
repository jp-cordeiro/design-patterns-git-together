import { PAYMENT_TYPE } from '@app/enums';

export class PaymentDto {
  amount: number;
  type?: PAYMENT_TYPE;
}

export class PaymentDtoVisa extends PaymentDto {
  installments: number;
  constructor() {
    super();
  }
}
