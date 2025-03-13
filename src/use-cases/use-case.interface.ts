import { PaymentDto } from '@app/dtos';

export interface UseCaseInterface {
  execute(paymentDto: PaymentDto): Promise<string>;
}
