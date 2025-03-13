import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { PaymentDto } from './dtos';
import {
  BoletoPaymentUseCase,
  CreditCardPaymentUseCase,
  PixPaymentUseCase,
} from './use-cases';
import { PAYMENT_TYPE } from './enums/payment-type.enum';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly pixPaymentUseCase: PixPaymentUseCase,
    private readonly boletoPaymentUseCase: BoletoPaymentUseCase,
    private readonly creditCardPaymentUseCase: CreditCardPaymentUseCase,
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
}
