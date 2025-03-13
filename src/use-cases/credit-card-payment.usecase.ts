import { AppService } from '@app/app.service';
import { PaymentDto } from '@app/dtos';
import {
  CreditCardPaymentFactory,
  CreditCardProcessFeeAppStrategy,
} from '@app/patterns';
import { UseCaseInterface } from './use-case.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreditCardPaymentUseCase implements UseCaseInterface {
  constructor(private readonly appService: AppService) {}

  async execute(paymentDto: PaymentDto): Promise<string> {
    const creditCardPaymentFactory = new CreditCardPaymentFactory();
    const creditCardProcessFeeAppStrategy =
      new CreditCardProcessFeeAppStrategy();
    const message = await this.appService.processPaymentWithFee({
      feeAppStrategy: creditCardProcessFeeAppStrategy,
      paymentFactory: creditCardPaymentFactory,
      paymentDto,
    });
    return message;
  }
}
