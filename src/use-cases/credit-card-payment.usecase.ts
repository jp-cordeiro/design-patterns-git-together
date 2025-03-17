import { AppService } from '@app/app.service';
import { PaymentDto, PaymentDtoVisa } from '@app/dtos';
import {
  CreditCardPaymentFactory,
  CreditCardProcessFeeAppStrategy,
  FullPaymentDecoratorFactory,
  PaymentNewVisaGatewayAdapter,
  PaymentVisaGatewayAdapter,
} from '@app/patterns';
import { UseCaseInterface } from './use-case.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreditCardPaymentUseCase implements UseCaseInterface {
  constructor(private readonly appService: AppService) {}

  async execute(paymentDto: PaymentDto): Promise<string> {
    const paymentGatewayAdapter = new PaymentVisaGatewayAdapter();
    const creditCardPaymentFactory = new CreditCardPaymentFactory(
      paymentGatewayAdapter,
    );
    const creditCardProcessFeeAppStrategy =
      new CreditCardProcessFeeAppStrategy();
    const message = await this.appService.processPaymentWithFee({
      feeAppStrategy: creditCardProcessFeeAppStrategy,
      paymentFactory: creditCardPaymentFactory,
      paymentDto,
      paymentDecorator: new FullPaymentDecoratorFactory(),
    });
    return message;
  }
}

@Injectable()
export class CreditCardNewVisaPaymentUseCase implements UseCaseInterface {
  constructor(private readonly appService: AppService) {}

  async execute(paymentDto: PaymentDtoVisa): Promise<string> {
    try {
      const paymentGatewayAdapter = new PaymentNewVisaGatewayAdapter();
      const creditCardPaymentFactory = new CreditCardPaymentFactory(
        paymentGatewayAdapter,
      );
      const creditCardProcessFeeAppStrategy =
        new CreditCardProcessFeeAppStrategy();
      const message = await this.appService.processPaymentWithFee({
        feeAppStrategy: creditCardProcessFeeAppStrategy,
        paymentFactory: creditCardPaymentFactory,
        paymentDto,
        paymentDecorator: new FullPaymentDecoratorFactory(),
      });
      return message;
    } catch (error) {
      throw new Error(error);
    }
  }
}
