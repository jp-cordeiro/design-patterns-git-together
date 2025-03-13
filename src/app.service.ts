import { Injectable } from '@nestjs/common';
import { PaymentDto } from '@app/dtos';
import {
  PaymentFactory,
  FeeAppStrategyInterface,
  ProcessAppFeeStrategy,
} from '@app/patterns';

type ProcessPaymentWithFeePayload = {
  paymentFactory: PaymentFactory;
  feeAppStrategy: FeeAppStrategyInterface;
  paymentDto: PaymentDto;
};

@Injectable()
export class AppService {
  async processPaymentWithFee(payload: ProcessPaymentWithFeePayload) {
    const { paymentFactory, feeAppStrategy, paymentDto } = payload;
    const { amount, type } = paymentDto;
    const processFeeApp = new ProcessAppFeeStrategy();
    processFeeApp.setStrategy(feeAppStrategy);
    const amoutProcessed = processFeeApp.calculateFee(amount) + amount;

    return await paymentFactory.processPayment({
      amount: amoutProcessed,
      type,
    });
  }
}
