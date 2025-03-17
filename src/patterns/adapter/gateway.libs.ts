export class VisaProcessPaymentGateway {
  async processVisaPayment(amount: number): Promise<string> {
    return `Pagamento de R$ ${amount} processado pelo cartão VISA`;
  }
}

export class NewVisaProcessPaymentGateway {
  async processVisaPayment(
    amount: number,
    installments: number,
  ): Promise<string> {
    return `Pagamento de R$ ${amount} processado pelo cartão VISA em ${installments} vezes`;
  }
}

export class MasterCardPaymentGateway {
  async masterCardPayment(amount: number): Promise<string> {
    return `Pagamento de R$ ${amount} processado pelo cartão MASTER CARD`;
  }
}
