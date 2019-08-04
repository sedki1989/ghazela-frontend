import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  jwt: string;
  public host = 'http://127.0.0.1:8001/api';
  constructor(private httpClient: HttpClient, private router: Router) { }
  user = {
        id: '',
        email: '',
        firstName: '',
        lastName: ''
    };

  login(data) {
    return this.httpClient.post(this.host + '/login', data, {observe: 'response'});
  }
  saveToken(token: string) {
    localStorage.setItem('token', 'Bearer ' + token);
    this.jwt = token;
    this.parseJWT();
  }
  parseJWT() {
    const jwtHelper = new JwtHelperService();
    const objJWT = jwtHelper.decodeToken(this.jwt);
    this.user.id = objJWT.id;
    this.user.email = objJWT.username;
    this.user.firstName = objJWT.firstName;
    this.user.lastName = objJWT.lastName;
    localStorage.setItem('user', JSON.stringify(this.user));

  }
  isAuthenticated() {
    return localStorage.getItem('user');
  }
  logout() {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
  }
    register(data) {
        return this.httpClient.post(this.host + '/users', data, {observe: 'response'});
    }
}
