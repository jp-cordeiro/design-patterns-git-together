import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  BoletoPaymentUseCase,
  CreditCardPaymentUseCase,
  PixPaymentUseCase,
} from './use-cases';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    PixPaymentUseCase,
    CreditCardPaymentUseCase,
    BoletoPaymentUseCase,
  ],
})
export class AppModule {}
