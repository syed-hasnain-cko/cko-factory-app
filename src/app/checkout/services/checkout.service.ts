import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPaymentMethod } from '../interfaces/payment-method-interface';
import { PAYMENT_METHODS } from '../data-store';
 
 
@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  authorization = '';
 
  constructor(private http:HttpClient) { 
    this.authorization = localStorage.getItem('secretKey') !== null ? `Bearer ${localStorage.getItem('secretKey')}` : `Bearer ${environment.secretKey}`;
  }

  postDetails(body:any):Observable<any>{

    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.authorization})
    };
    return this.http.post<any>(`${environment.baseAPIUrl}/payments`, body , httpOptions);
  }
 
  getDetails(id: string):Observable<any>{
    
    let url = `${environment.baseAPIUrl}/payments/${id}`;
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': this.authorization})
    };
    return this.http.get<any>(url, httpOptions);
  }

  executePaymentAction(uri:any, id:any):Observable<any>{

    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization': this.authorization})
    };
    return this.http.post<any>(uri,null,httpOptions);
  }

  public addPaymentToLocalStorage(id: string) {

    let payments: string[] | null = JSON.parse(localStorage.getItem('payments') || '[]');
    if (!payments) {
      localStorage.setItem('payments', JSON.stringify([id]));
    } else {
      payments.push(id);
      localStorage.setItem('payments', JSON.stringify(payments));
    }
  }

  public paymentMethodIcon(payment: any): string {
    return payment.source.type == 'card' ? (<string>payment.source["scheme"]).toLowerCase() : payment.source.type;
  }

}


 
 

