import { Injectable } from '@nestjs/common';
import { PaymentDto } from '@app/dtos';
import {
  PaymentFactory,
  FeeAppStrategyInterface,
  ProcessAppFeeStrategy,
  PaymentDecoratorsAdapterInterface,
} from '@app/patterns';

type ProcessPaymentWithFeePayload = {
  paymentFactory: PaymentFactory;
  feeAppStrategy: FeeAppStrategyInterface;
  paymentDto: PaymentDto;
  paymentDecorator?: PaymentDecoratorsAdapterInterface;
};

@Injectable()
export class AppService {
  async processPaymentWithFee(payload: ProcessPaymentWithFeePayload) {
    const { paymentFactory, feeAppStrategy, paymentDto, paymentDecorator } =
      payload;
    const { amount } = paymentDto;
    const processFeeApp = new ProcessAppFeeStrategy();
    processFeeApp.setStrategy(feeAppStrategy);
    const amoutProcessed = processFeeApp.calculateFee(amount) + amount;

    let payment = await paymentFactory.createPayment();
    if (paymentDecorator) {
      payment = paymentDecorator.decorate(payment);
    }

    const result = await payment.processPayment(amoutProcessed);

    return result;
  }
}
