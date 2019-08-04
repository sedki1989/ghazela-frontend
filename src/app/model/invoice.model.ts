export class Invoice {
        amount: number;
        sentAt: string;
        status: string;
        customer: string;
    constructor(amount: number, sentAt: string, status: string, customer: string) {
        this.amount = amount;
        this.sentAt = sentAt;
        this.status = status;
        this.customer = customer;
    }
}
