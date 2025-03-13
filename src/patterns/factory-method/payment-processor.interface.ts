export interface PaymentProcessor {
  processPayment(amount: number): Promise<string>;
}
