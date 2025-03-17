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

type CalculatePaymentFeePayload = {
  feeAppStrategy: FeeAppStrategyInterface;
  amount: number;
};

type ProcessPaymentByFactory = {
  paymentFactory: PaymentFactory;
  paymentDto: PaymentDto;
  paymentDecorator?: PaymentDecoratorFactory;
  amountFeeProcessed: number;
};

@Injectable()
export class AppService {
  async processPaymentWithFee(
    payload: ProcessPaymentWithFeePayload,
  ): Promise<string> {
    const { paymentFactory, feeAppStrategy, paymentDto, paymentDecorator } =
      payload;
    const { amount } = paymentDto;

    const amountFeeProcessed = this.calculatePaymentFee({
      feeAppStrategy,
      amount,
    });
    const result = await this.processPaymentByFactory({
      paymentFactory,
      paymentDecorator,
      amountFeeProcessed,
      paymentDto,
    });

    return result;
  }

  calculatePaymentFee(payload: CalculatePaymentFeePayload): number {
    const { feeAppStrategy, amount } = payload;
    const processFeeApp = new ProcessAppFeeStrategy();
    processFeeApp.setStrategy(feeAppStrategy);
    const amountProcessed = processFeeApp.calculateFee(amount) + amount;
    return amountProcessed;
  }

  async processPaymentByFactory(
    payload: ProcessPaymentByFactory,
  ): Promise<string> {
    const { paymentDto, paymentFactory, paymentDecorator, amountFeeProcessed } =
      payload;
    let payment = await paymentFactory.createPayment();
    if (paymentDecorator) {
      payment = paymentDecorator.decoratePayment(payment);
    }
    const result = await payment.processPayment({
      ...paymentDto,
      amount: amountFeeProcessed,
    });
    return result;
  }
}
