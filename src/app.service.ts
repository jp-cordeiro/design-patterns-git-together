import { Injectable } from '@nestjs/common';
import { PaymentDto } from '@app/dtos';
import {
  PaymentFactory,
  FeeAppStrategyInterface,
  ProcessAppFeeStrategy,
  PaymentDecoratorFactory,
} from '@app/patterns';

type ProcessPaymentWithFeePayload = {
  paymentFactory: PaymentFactory;
  feeAppStrategy: FeeAppStrategyInterface;
  paymentDto: PaymentDto;
  paymentDecorator?: PaymentDecoratorFactory;
};

@Injectable()
export class AppService {
  async processPaymentWithFee(
    payload: ProcessPaymentWithFeePayload,
  ): Promise<string> {
    const { paymentFactory, feeAppStrategy, paymentDto, paymentDecorator } =
      payload;
    const { amount } = paymentDto;

    //Pode ser extraído para um serviço
    const processFeeApp = new ProcessAppFeeStrategy();
    processFeeApp.setStrategy(feeAppStrategy);
    const amoutProcessed = processFeeApp.calculateFee(amount) + amount;

    //Pode ser extraído para um serviço
    let payment = await paymentFactory.createPayment();
    if (paymentDecorator) {
      payment = paymentDecorator.decoratePayment(payment);
    }
    const result = await payment.processPayment(amoutProcessed);

    return result;
  }
}
