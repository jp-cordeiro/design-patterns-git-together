import { FeeAppStrategyInterface } from './fee-app-strategy.interface';

export class ProcessAppFeeStrategy {
  private feeStrategy: FeeAppStrategyInterface;

  setStrategy(feeStrategy: FeeAppStrategyInterface) {
    this.feeStrategy = feeStrategy;
  }

  calculateFee(amount: number): number {
    const fee = this.feeStrategy.calculate(amount);
    return fee;
  }
}
