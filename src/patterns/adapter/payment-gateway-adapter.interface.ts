export interface PaymentGatewayAdapterInterface {
  processPayment(amount: number): Promise<string>;
}
