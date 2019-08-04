import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class InvoicesService {
    public host = 'http://127.0.0.1:8001/api';

    constructor(private httpClient: HttpClient) {
    }

    private header = new HttpHeaders({authorization: localStorage.getItem('token')});

    public getInvoicesList(page: number, size: number) {
        return this.httpClient.get(this.host + '/users/' + JSON.parse(localStorage.getItem('user')).id
             + '/invoices?page=' + page + '&pageSize=' + size, {headers: this.header});
    }

    public getInvoicesListByClient(id: string, page: number, size: number) {
        return this.httpClient.get(this.host + '/customers/' + id
            + '/invoices??pagination=true&count='
            + size + '&page=' + page, {headers: this.header});
    }

    public addInvoice(data) {
        return this.httpClient.post( this.host + '/invoices', data, {headers : this.header});
    }

    public deleteInvoice(id: number) {
        return this.httpClient.delete(this.host + '/invoices/' + id, {headers : this.header} );
    }
    public editInvoice(data, id) {
        return this.httpClient.put( this.host + '/invoices/' + id , data, {headers : this.header});
    }
}
