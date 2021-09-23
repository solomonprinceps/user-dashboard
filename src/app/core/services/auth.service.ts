import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  redirectUrl: string;
  constructor(private http: HttpClient) { }

  storeToken(token) {
    return window.localStorage.setItem('cw-account-token', token);
  }

  getToken() {
    return window.localStorage.getItem('cw-account-token');
  }

  storeUser(user: any) {
    return localStorage.setItem('cw-account-user', JSON.stringify(user));
  }

  getUser() {
    return localStorage.getItem('cw-account-user') || null;
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  login(user) {
    return this.http.post(`${environment.api}customer/login`, user);
  }

  sendNewPassword(email) {
    return this.http.post(`${environment.api}customer/password/reset`, email);
  }

  changePassword(details) {
    return this.http.post(`${environment.api}customer/password/change`, details);
  }

  async clearStorage() {
    await window.localStorage.removeItem('cw-account-user');
    await window.localStorage.removeItem('cw-account-token');
  }
  logOut() {
    return this.clearStorage();
  }

  async deleteToken() {
    await window.localStorage.removeItem('cw-account-token');
  }
}
