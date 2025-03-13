import { AppService } from '@app/app.service';
import { PaymentDto } from '@app/dtos';
import {
  BoletoPaymentFactory,
  BoletoProcessFeeAppStrategy,
} from '@app/patterns';
import { UseCaseInterface } from './use-case.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BoletoPaymentUseCase implements UseCaseInterface {
  constructor(private readonly appService: AppService) {}

  async execute(paymentDto: PaymentDto): Promise<string> {
    const boletoPaymentFactory = new BoletoPaymentFactory();
    const boletoProcessFeeAppStrategy = new BoletoProcessFeeAppStrategy();
    const message = await this.appService.processPaymentWithFee({
      feeAppStrategy: boletoProcessFeeAppStrategy,
      paymentFactory: boletoPaymentFactory,
      paymentDto,
    });
    return message;
  }
}
