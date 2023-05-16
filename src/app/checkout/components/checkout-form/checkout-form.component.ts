import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
 
import { DOCUMENT } from '@angular/common';
import { CheckoutService } from '../../services/checkout.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/_alert';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { IPaymentMethod } from '../../interfaces/payment-method-interface';
import { CURRENCIES, PAYMENT_METHODS } from '../../data-store';
 
const reduceToUniques = (value: any, index: any, self: string | any[]) => {
  return self.indexOf(value) === index;
};


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
  apmInvalid = false;

  Currencies = CURRENCIES.map(currency => currency.iso4217)
  Countries = PAYMENT_METHODS.map(paymentMethod => paymentMethod.restrictedCurrencyCountryPairings).filter(pairing => pairing != null)
  .map(pairing => 
    Object.values(pairing)
  ).flat(3).filter(reduceToUniques).sort();
  
    
  AuthorizationType: any = ['Final','Estimated']
  PaymentMethods = PAYMENT_METHODS.map(apms => apms.type)
 
  checkoutdetails = new FormGroup({
    name: new FormControl('',[Validators.required, Validators.pattern('[a-zA-Z ]*')]),
    email: new FormControl('',[Validators.required, Validators.minLength(6), Validators.email]),
    amount: new FormControl('', [Validators.required,Validators.max(50000)]),
    paymentMethod: new FormControl('frames',[Validators.required]),
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
 console.log(this.Countries)
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

  this.apmToCountryCurrencyMappingValidator();

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
    case 'frames':{
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
 
    this.checkoutService.postDetails(body).subscribe((data:any)=>{
      if(data.status == "Pending")
      this.goToUrl(data._links.redirect.href);
      else{
        this.router.navigateByUrl('/success');
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
        this.router.navigateByUrl('/success');
      }
    },
      (error) =>{
        console.log(error.status + ' ' + error.message)
        this.alertService.error(error.status + ' ' + error.message,this.options)
      }
    );
  
  }


   apmToCountryCurrencyMappingValidator() {
    let currency = this.checkoutdetails.controls['currency'].value;
    let country = this.checkoutdetails.controls['country'].value;
    let apm = this.checkoutdetails.controls['paymentMethod'].value;

    let paymentMethod = PAYMENT_METHODS.find(apms => apms.type == apm);
    if(paymentMethod != undefined){
      if(paymentMethod.restrictedCurrencyCountryPairings == null){
        return;
    }
    }
        if(paymentMethod != null && currency !== null && country !== null){
          console.log(paymentMethod.restrictedCurrencyCountryPairings)
          if(paymentMethod.restrictedCurrencyCountryPairings != null){
            if(paymentMethod.restrictedCurrencyCountryPairings[currency] != undefined){
            if ((paymentMethod.restrictedCurrencyCountryPairings[currency] as string[]).includes(country)){
              this.apmInvalid = false;
              return;
            }
          }
          }
        }
        this.alertService.warn(`${apm} is not available for ${country} to be processed in ${currency}`,this.options)
        this.apmInvalid = true;
  }

  }
  
 

  
 
 

