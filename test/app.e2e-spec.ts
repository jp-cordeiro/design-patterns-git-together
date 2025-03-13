import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PAYMENT_TYPE } from '@app/enums/payment-type.enum';
import {
  BoletoProcessFeeAppStrategy,
  CreditCardProcessFeeAppStrategy,
  PixProcessFeeAppStrategy,
} from '@app/patterns';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('factory-method', () => {
    const amount = 123;
    it('should pay with pix and return 200', async () => {
      const response = await request(app.getHttpServer())
        .post('/pay/pix')
        .send({ amount });

      const pixProcessFeeAppStrategy = new PixProcessFeeAppStrategy();
      const amountWithFee = pixProcessFeeAppStrategy.calculate(amount) + amount;

      expect(response.status).toBe(HttpStatus.OK);
      expect(response.text).toEqual(
        `Foi pago R$ ${amountWithFee} por ${PAYMENT_TYPE.PIX}`,
      );
    });

    it('should pay with boleto and return 200', async () => {
      const response = await request(app.getHttpServer())
        .post('/pay/boleto')
        .send({ amount: 123 });

      const boletoProcessFeeAppStrategy = new BoletoProcessFeeAppStrategy();
      const amountWithFee =
        boletoProcessFeeAppStrategy.calculate(amount) + amount;

      expect(response.status).toBe(HttpStatus.OK);
      expect(response.text).toEqual(
        `Foi pago R$ ${amountWithFee} por ${PAYMENT_TYPE.BOLETO}`,
      );
    });

    it('should pay with credit-card and return 200', async () => {
      const response = await request(app.getHttpServer())
        .post('/pay/credit-card')
        .send({ amount: 123 });

      const creditCardProcessFeeAppStrategy =
        new CreditCardProcessFeeAppStrategy();
      const amountWithFee =
        creditCardProcessFeeAppStrategy.calculate(amount) + amount;

      expect(response.status).toBe(HttpStatus.OK);
      expect(response.text).toEqual(
        `Foi pago R$ ${amountWithFee} por ${PAYMENT_TYPE.CREDIT_CARD}`,
      );
    });
  });
});
