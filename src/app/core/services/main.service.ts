import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) { }

  fetchDashboard() {
    return this.http.get(`${environment.api}customer/account/dashboard`);
  }

  liquidateLoan(liquidation) {
    return this.http.post(`${environment.api}customer/loan/liquidate`, liquidation);
  }

  processLetter(letter, type) {
    return this.http.post(`${environment.api}customer/request/${type}`, letter);
  }

  viewAllLoans() {
    return this.http.get(`${environment.api}customer/loan/all`);
  }

  fetchSingleLoan(loanDetails) {
    return this.http.post(`${environment.api}customer/loan/one`, loanDetails);
  }

  calcRepayment(details) {
    return this.http.post(`${environment.api}utilities/loan/calculator`, details);
  }

  loanApply(details) {
    return this.http.post(`${environment.api}customer/apply`, details);
  }

  //solomon code
  requestrefunds(loanid) {
    return this.http.post(`${environment.api}customer/refund/request`, {loanid: loanid})
  }
}
