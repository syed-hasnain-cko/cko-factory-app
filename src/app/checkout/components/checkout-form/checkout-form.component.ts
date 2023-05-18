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
  showBenefitPay = false;
  showFawry = false;
  showTrustly = false;
  showKnet = false;
  showGooglePay = false;
  showQpay = false;
  showSepa = false;
  showKlarna = false;
  showPaypal = false;
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
    name: new FormControl('Syed Hasnain',[Validators.required, Validators.pattern('[a-zA-Z ]*')]),
    email: new FormControl('smhasnain1996@gmail.com',[Validators.required, Validators.minLength(6), Validators.email]),
    countryCode: new FormControl('+33',[Validators.required,Validators.maxLength(7),Validators.minLength(1)]),
    number: new FormControl('1234567890',[Validators.required,Validators.maxLength(25),Validators.minLength(6)]),
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
    idealForm:  new FormGroup({
      description: new FormControl('Test Ideal Payment',[Validators.required, Validators.maxLength(35)]),
      bic: new FormControl('INGBNL2A',[Validators.required, Validators.maxLength(11)]),
      language: new FormControl('',[Validators.maxLength(2)])
    }),
    p24Form:  new FormGroup({
      paymentCountry: new FormControl('PL',[Validators.required, Validators.maxLength(2)]),
      accountHolderName: new FormControl('John Smith',[Validators.required, Validators.minLength(3),Validators.maxLength(100)]),
      accountHolderEmail: new FormControl('john.smith@example.com',[Validators.required,Validators.maxLength(254),Validators.email]),
      billingDescriptor: new FormControl('P24 Test Payment',[Validators.maxLength(65534)])
    }),
    description: new FormControl('Test Giropay Payment',[Validators.required, Validators.maxLength(100)]),
    purpose: new FormControl('Test EPS Payment',[Validators.required, Validators.maxLength(27)])
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
      this.disableCardPaymentsFields();
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
    case 'trustly':{
      this.showTrustly = true;
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

    let selectedCurrency = CURRENCIES.filter(currency => currency.iso4217 == this.checkoutdetails.controls.currency.value).find(base => base.base);
    let finalAmount;
    if(selectedCurrency != undefined && this.checkoutdetails.controls['amount'].value != null){
      finalAmount = parseFloat(this.checkoutdetails.controls['amount'].value) * selectedCurrency?.base
    }
 
    var body = {
      "source":{
        "type":"token",
        "token":event
      },
      "amount": finalAmount,
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
        "email":this.checkoutdetails.controls['email'].value,
        "phone":{
          "country_code":this.checkoutdetails.controls.countryCode.value,
          "number":this.checkoutdetails.controls.number.value
        }
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
      else if(data.status == "Declined"){
        this.alertService.error(`The payment is declined with response message: ${data.response_summary}-${data.response_code} `,this.options)
      }
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
     break;
      }
      case 'ideal':{
        sourceObject = 
        `
        {
        "type": "${this.checkoutdetails.controls['paymentMethod'].value}",
        "bic": "${this.checkoutdetails.controls['idealForm'].controls['bic'].value}",
        "description":"${this.checkoutdetails.controls['idealForm'].controls['description'].value}",
        "language":"${this.checkoutdetails.controls['idealForm'].controls['language'].value}"
     }`;
     break;
      }
      case 'eps':{
        sourceObject =      
        `
        {
        "type": "${this.checkoutdetails.controls['paymentMethod'].value}",
        "purpose": "${this.checkoutdetails.controls.purpose}"
     }`;  
        break;
       }
       case 'p24':{
        sourceObject = 
        `
        {
        "type": "${this.checkoutdetails.controls.paymentMethod.value}",
        "payment_country": "${this.checkoutdetails.controls.p24Form.controls.paymentCountry.value}",
        "account_holder_name":"${this.checkoutdetails.controls.p24Form.controls.accountHolderName.value}",
        "account_holder_email":"${this.checkoutdetails.controls.p24Form.controls.accountHolderEmail.value}",
        "billing_descriptor":"${this.checkoutdetails.controls.p24Form.controls.billingDescriptor.value}"
     }`;
       }
       break;
       case 'trustly':{
        sourceObject =      
        `
        {
        "type": "${this.checkoutdetails.controls.paymentMethod.value}",
        "billing_address":{
          "address_line1":"${this.checkoutdetails.controls.address.value}",
          "city":"${this.checkoutdetails.controls.city.value}",
          "country":"${this.checkoutdetails.controls.country.value}",
          "zip":"${this.checkoutdetails.controls.zip.value}"
        }
     }`; 
     break;
      }
         
    }
    return sourceObject;
  }

  //for APM payments only
  submitPayment(){

    let selectedCurrency = CURRENCIES.filter(currency => currency.iso4217 == this.checkoutdetails.controls.currency.value).find(base => base.base);
    let finalAmount;
    if(selectedCurrency != undefined && this.checkoutdetails.controls['amount'].value != null){
      finalAmount = parseFloat(this.checkoutdetails.controls['amount'].value) * selectedCurrency?.base
    }

    let source = this.createSourceObject();

    let paymentRequestBody = {
      "source":JSON.parse(source),
      "amount":finalAmount,
      "currency":this.checkoutdetails.controls['currency'].value,
      "processing_channel_id":localStorage.getItem('processingChannelId') !== null ? localStorage.getItem('processingChannelId') : environment.processingChannelId,
      "success_url":"http://localhost:4200/success",
      "failure_url":"http://localhost:4200/failure",
      "customer":{
        "name":this.checkoutdetails.controls['name'].value,
        "email":this.checkoutdetails.controls['email'].value,
        "phone":{
          "country_code":this.checkoutdetails.controls.countryCode.value,
          "number":this.checkoutdetails.controls.number.value
        }
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
      else if(data.status == "Declined"){
        this.alertService.error(`The payment is declined with response message: ${data.response_summary}-${data.response_code} `,this.options)
      }
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
  
 

  
 
 

