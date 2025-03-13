import { FeeAppStrategyInterface } from './fee-app-strategy.interface';

export class PixProcessFeeAppStrategy implements FeeAppStrategyInterface {
  calculate(amount: number): number {
    return amount * 0;
  }
}

export class BoletoProcessFeeAppStrategy implements FeeAppStrategyInterface {
  calculate(amount: number): number {
    return amount * 0.01;
  }
}

export class CreditCardProcessFeeAppStrategy
  implements FeeAppStrategyInterface
{
  calculate(amount: number): number {
    return amount * 0.05;
  }
}
