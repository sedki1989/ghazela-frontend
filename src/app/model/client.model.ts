export class Client {
        firstName: string;
        lastName: string;
        email: string;
        company: string;
        invoices: [];
        user: string;
    constructor(firstName: string, lastName: string, email: string, company: string, invoices: [], user: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.company = company;
        this.invoices = invoices;
        this.user = user;
    }
}
