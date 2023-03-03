import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 
 
@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  
 
  constructor(private http:HttpClient) { 
 
  }
 
  postDetails(body:any):Observable<any>{
    const url = "https://integrations-cko.herokuapp.com/pay3d";
 
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<any>(url, body , httpOptions);
  }
 
  getDetails(id: string):Observable<any>{
    const url = `https://api.sandbox.checkout.com/payments/${id}`;
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': '' })
    };
    return this.http.get<any>(url, httpOptions);
  }
}
 
 

