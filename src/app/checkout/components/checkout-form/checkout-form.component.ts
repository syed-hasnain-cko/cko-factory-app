import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
 
import { DOCUMENT } from '@angular/common';
import { CheckoutService } from '../../services/checkout.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/_alert';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
 
 
@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.css']
})
 
export class CheckoutFormComponent implements OnInit {

  showFrames = true;
  showSofort = false;
  showIdeal = false;
  showGiropay = false;
  showBancontact = false;
  showMultibanco = false;
  showEPS = false;
  showP24 = false;
  showAuthorizationType = true;
  showCapture = true;
  show3ds = true;

  Currencies: any = ['EUR', 'USD', 'GBP']
  Countries: any = ['DE', 'US', 'UK']
  AuthorizationType: any = ['Final','Estimated']
  PaymentMethods: any = ['Frames','sofort','giropay','eps','p24','bancontact','ideal','multibanco', 'trustly', 'tamara', 'knet','fawry','benefit']
 
  checkoutdetails = new FormGroup({
    name: new FormControl('',[Validators.required, Validators.pattern('[a-zA-Z ]*')]),
    email: new FormControl('',[Validators.required, Validators.minLength(6), Validators.email]),
    amount: new FormControl('', [Validators.required,Validators.max(50000)]),
    paymentMethod: new FormControl('Frames',[Validators.required]),
    currency: new FormControl('EUR',[Validators.required]),
    threeDS: new FormControl(true,[Validators.required]),
    capture: new FormControl(true),
    authorizationType: new FormControl('Final',[Validators.required]),
    country: new FormControl('DE',[Validators.required]),
    city: new FormControl('Schonefeld',[Validators.required]),
    zip: new FormControl('12529',[Validators.required]),
    address: new FormControl('Angerstrasse 23',[Validators.required]),
    sofortForm:  new FormGroup({
      languageCode: new FormControl('EN',[Validators.required, Validators.maxLength(2)]),
      countryCode: new FormControl('DE',[Validators.required, Validators.maxLength(2)])
    }),
    description: new FormControl('Test Giropay Payment',[Validators.required, Validators.maxLength(100)])

  });
  
  token:string ="";

  
  constructor(private checkoutService:CheckoutService,@Inject(DOCUMENT) private document: Document, protected alertService:AlertService, private router: Router) { }
 
  ngOnInit(): void {
  
  }

  options = {
    autoClose: true,
    keepAfterRouteChange: false,
    id: "alert-http-failure"
};

disableCardPaymentsFields(){
  this.showAuthorizationType = false;
  this.showCapture = false;
  this.show3ds = false;
}

disableNonActivePaymentMethodFields(apm:any){

  this.showFrames = false;
  this.showSofort = false;
  this.showIdeal = false;
  this.showGiropay = false;
  this.showBancontact = false;
  this.showMultibanco = false;
  this.showEPS = false;
  this.showP24 = false;

  switch(apm.target.value){
    case 'sofort':{
      this.showSofort = true;
      this.disableCardPaymentsFields();
break;
    }
    case 'giropay':{
      this.showGiropay = true;
      this.disableCardPaymentsFields();
break;
    }
    case 'ideal':{
      this.showIdeal = true;
      this.disableCardPaymentsFields();
break;
    }
    case 'eps':{
      this.showEPS = true;
      this.disableCardPaymentsFields();
break;
    }
    case 'multibanco':{
      this.showMultibanco = true;
break;
    }
    case 'bancontact':{
      this.showBancontact = true;
      this.disableCardPaymentsFields();
break;
    }
    case 'p24':{
      this.showP24 = true;
      this.disableCardPaymentsFields();
break;
    }
    case 'Frames':{
      this.showFrames = true;
      this.showAuthorizationType = true;
      this.showCapture = true;
      this.show3ds = true;
break;
    }
    default:{
      this.showFrames = true;
      this.showAuthorizationType = true;
      this.showCapture = true;
      this.show3ds = true;
    }

  }

}
  
//For Frames payment only
 
  onTokenized(event :any){
 
    var body = {
      "source":{
        "type":"token",
        "token":event
      },
      "amount":this.checkoutdetails.controls['amount'].value,
      "currency":this.checkoutdetails.controls['currency'].value,
      "3ds":{
        "enabled":this.checkoutdetails.controls['threeDS'].value
      },
      "capture":this.checkoutdetails.controls['capture'].value,
      "authorization_type":this.checkoutdetails.controls['authorizationType'].value,
      "processing_channel_id":localStorage.getItem('processingChannelId') !== null ? localStorage.getItem('processingChannelId') : environment.processingChannelId,
      "success_url":"http://localhost:4200/success",
      "failure_url":"http://localhost:4200/failure",
      "customer":{
        "name":this.checkoutdetails.controls['name'].value,
        "email":this.checkoutdetails.controls['email'].value
      },
      "description": this.checkoutdetails.controls['description'].value,
      "reference": "Order-"+ Math.floor(Math.random() * 1000) + 1,
      "shipping":{
        "address":{
          "address_line1": this.checkoutdetails.controls['address'].value,
          "city": this.checkoutdetails.controls['city'].value,
          "zip": this.checkoutdetails.controls['zip'].value,
          "country": this.checkoutdetails.controls['country'].value
        }
      },
      "metadata":{
        "udf1":"Payment-From-Factory-App",
      }
    }

    console.log(body)
 
    this.checkoutService.postDetails(body).subscribe((data:any)=>{
      if(data.status == "Pending")
      this.goToUrl(data._links.redirect.href);
      else{
        this.router.navigateByUrl('/success',{state:data.id});
      }
    },
      (error) =>{
        console.log(error.status + ' ' + error.message)
        this.alertService.error(error.status + ' ' + error.message,this.options)
      }
    );
 
  }
 
  goToUrl(url:any): void {
    this.document.location.href = url;
  }

  createSourceObject(){
    let sourceObject = ``;
    console.log(this.checkoutdetails.controls['paymentMethod'].value)
  
    switch(this.checkoutdetails.controls['paymentMethod'].value){
      case 'sofort':{
       sourceObject =      
       `
       {
       "type": "${this.checkoutdetails.controls['paymentMethod'].value}",
       "languageCode": "${this.checkoutdetails.controls['sofortForm'].controls['languageCode'].value}",
       "countryCode": "${this.checkoutdetails.controls['sofortForm'].controls['countryCode'].value}"
    }`;  
        break;
      }
      case 'giropay':{
        sourceObject =      
        `
        {
        "type": "${this.checkoutdetails.controls['paymentMethod'].value}"
     }`; 
      }
         
    }
    console.log(sourceObject)
    return sourceObject;
  }

  //for APM payments only
  submitPayment(){

    let source = this.createSourceObject();

    let paymentRequestBody = {
      "source":JSON.parse(source),
      "amount":this.checkoutdetails.controls['amount'].value,
      "currency":this.checkoutdetails.controls['currency'].value,
      "processing_channel_id":localStorage.getItem('processingChannelId') !== null ? localStorage.getItem('processingChannelId') : environment.processingChannelId,
      "success_url":"http://localhost:4200/success",
      "failure_url":"http://localhost:4200/failure",
      "customer":{
        "name":this.checkoutdetails.controls['name'].value,
        "email":this.checkoutdetails.controls['email'].value
      },
      "description": this.checkoutdetails.controls['description'].value,
      "reference": "Order-"+ Math.floor(Math.random() * 1000) + 1,
      "shipping":{
        "address":{
          "address_line1": this.checkoutdetails.controls['address'].value,
          "city": this.checkoutdetails.controls['city'].value,
          "zip": this.checkoutdetails.controls['zip'].value,
          "country": this.checkoutdetails.controls['country'].value
        }
      },
      "metadata":{
        "udf1":"Payment-From-Factory-App",
      }
    }

    this.checkoutService.postDetails(paymentRequestBody).subscribe((data:any)=>{
      if(data.status == "Pending")
      this.goToUrl(data._links.redirect.href);
      else{
        this.router.navigateByUrl('/success/',{state:data.id});
      }
    },
      (error) =>{
        console.log(error.status + ' ' + error.message)
        this.alertService.error(error.status + ' ' + error.message,this.options)
      }
    );
  
  }
 
}
  
 
 

