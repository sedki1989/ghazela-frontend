import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  public host = 'http://127.0.0.1:8001/api';
  constructor(private httpClient: HttpClient) { }
  private header = new HttpHeaders({ authorization : localStorage.getItem('token')});
  public getCustomers(page: number, size: number, name: string) {
    let s: string;
    if ( name.length > 0 ) {
      s = '/users/' + JSON.parse(localStorage.getItem('user')).id + '/customers?pagination=true&count='
                        + size + '&page=' + page + '&firstName=' + name;
    } else {
      s = '/users/' + JSON.parse(localStorage.getItem('user')).id + '/customers?pagination=true&count=' + size + '&page=' + page;
    }
    return this.httpClient.get(this.host + s, {headers : this.header});
  }

  public deleteCustomers(id: number) {
    return this.httpClient.delete(this.host + '/customers/' + id, {headers : this.header} );
  }

  public addCustomers(data) {
    return this.httpClient.post( this.host + '/customers', data, {headers : this.header});
  }
  public editCustomers(data, id) {
    return this.httpClient.put( this.host + '/customers/' + id , data, {headers : this.header});
  }
}
