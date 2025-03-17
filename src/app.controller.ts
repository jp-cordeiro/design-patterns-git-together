import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { PaymentDto, PaymentDtoVisa } from './dtos';
import {
  BoletoPaymentUseCase,
  CreditCardNewVisaPaymentUseCase,
  CreditCardPaymentUseCase,
  PixPaymentUseCase,
} from './use-cases';
import { PAYMENT_TYPE } from './enums';

@Controller()
export class AppController {
  constructor(
    private readonly pixPaymentUseCase: PixPaymentUseCase,
    private readonly boletoPaymentUseCase: BoletoPaymentUseCase,
    private readonly creditCardPaymentUseCase: CreditCardPaymentUseCase,
    private readonly creditCardNewVisaPaymentUseCase: CreditCardNewVisaPaymentUseCase,
  ) {}

  @Post('/pay/pix')
  @HttpCode(HttpStatus.OK)
  async payWithPix(@Body() paymentDto: PaymentDto): Promise<string> {
    const result = await this.pixPaymentUseCase.execute({
      ...paymentDto,
      type: PAYMENT_TYPE.PIX,
    });
    return result;
  }

  @Post('/pay/boleto')
  @HttpCode(HttpStatus.OK)
  async payWithBoleto(@Body() paymentDto: PaymentDto): Promise<string> {
    const result = await this.boletoPaymentUseCase.execute({
      ...paymentDto,
      type: PAYMENT_TYPE.BOLETO,
    });
    return result;
  }

  @Post('/pay/credit-card')
  @HttpCode(HttpStatus.OK)
  async payWithCreditCard(@Body() paymentDto: PaymentDto): Promise<string> {
    const result = await this.creditCardPaymentUseCase.execute({
      ...paymentDto,
      type: PAYMENT_TYPE.CREDIT_CARD,
    });
    return result;
  }

  @Post('/pay/credit-card/visa')
  @HttpCode(HttpStatus.OK)
  async payWithCreditCardNewVisaPayment(
    @Body() paymentDto: PaymentDtoVisa,
  ): Promise<string> {
    const result = await this.creditCardNewVisaPaymentUseCase.execute({
      ...paymentDto,
      type: PAYMENT_TYPE.CREDIT_CARD,
    });
    return result;
  }
}
