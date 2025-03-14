import { AppService } from '@app/app.service';
import { PaymentDto } from '@app/dtos';
import {
  PaymentDecoratorsAdapter,
  PixPaymentFactory,
  PixProcessFeeAppStrategy,
} from '@app/patterns';
import { UseCaseInterface } from './use-case.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PixPaymentUseCase implements UseCaseInterface {
  constructor(private readonly appService: AppService) {}

  async execute(paymentDto: PaymentDto): Promise<string> {
    const pixPaymentFactory = new PixPaymentFactory();
    const pixProcessFeeAppStrategy = new PixProcessFeeAppStrategy();
    const message = await this.appService.processPaymentWithFee({
      feeAppStrategy: pixProcessFeeAppStrategy,
      paymentFactory: pixPaymentFactory,
      paymentDto,
      paymentDecorator: new PaymentDecoratorsAdapter(),
    });
    return message;
  }
}
