import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
 
import { DOCUMENT } from '@angular/common';
import { CheckoutService } from '../../services/checkout.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
 
 
@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.css']
})
 
export class CheckoutFormComponent implements OnInit {
 
  checkoutdetails = new FormGroup({
    name: new FormControl('',[Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]),
    email: new FormControl('',[Validators.required, Validators.minLength(3), Validators.email]),
  });
  
  
  token:string ="";
  
  constructor(private checkoutService:CheckoutService,@Inject(DOCUMENT) private document: Document) { }
 
  ngOnInit(): void {
  
  }
 
  onTokenized(event :any){
 
    var body = {
      "source":{
        "type":"token",
        "token":event
      },
      "amount":265*100,
      "currency":"EUR",
      "3ds":{
        "enabled":true
      },
      "processing_channel_id":"pc_oxr4t4p3nseejeqdjqk3pdlpm4",
      "success_url":"http://localhost:4200/success",
      "failure_url":"http://localhost:4200/failure",
    }
 
    this.checkoutService.postDetails(body).subscribe((data:any)=>{
      console.log(data);
      this.goToUrl(data._links.redirect.href);
    });
 
  }
 
  goToUrl(url:any): void {
    this.document.location.href = url;
  }
 
}
  
 
 

