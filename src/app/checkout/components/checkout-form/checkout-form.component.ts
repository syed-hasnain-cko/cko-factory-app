import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
 
import { DOCUMENT } from '@angular/common';
import { CheckoutService } from '../../services/checkout.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/_alert';
import { environment } from 'src/environments/environment';
import { NavigationExtras, Router } from '@angular/router';
import { IPaymentMethod } from '../../interfaces/payment-method-interface';
import { CURRENCIES, PAYMENT_METHODS, PAYPAL_PLANS } from '../../data-store';
 
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
  showTamara = false;
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

  paypalPlans = PAYPAL_PLANS; 
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
    countryCode: new FormControl('+966',[Validators.required,Validators.maxLength(7),Validators.minLength(1)]),
    number: new FormControl('523456789',[Validators.required,Validators.maxLength(25),Validators.minLength(6)]),
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
      language: new FormControl('en',[Validators.maxLength(2)])
    }),
    p24Form:  new FormGroup({
      paymentCountry: new FormControl('PL',[Validators.required, Validators.maxLength(2)]),
      accountHolderName: new FormControl('John Smith',[Validators.required, Validators.minLength(3),Validators.maxLength(100)]),
      accountHolderEmail: new FormControl('john.smith@example.com',[Validators.required,Validators.maxLength(254),Validators.email]),
      billingDescriptor: new FormControl('P24 Test Payment',[Validators.maxLength(65534)])
    }),
    bancontactForm:  new FormGroup({
      paymentCountry: new FormControl('BE',[Validators.required, Validators.maxLength(2)]),
      accountHolderName: new FormControl('John Smith',[Validators.required, Validators.minLength(3),Validators.maxLength(100)]),
      language: new FormControl('en',[Validators.maxLength(2)]),
      billingDescriptor: new FormControl('Bancontact Test Payment',[Validators.maxLength(65534)])
    }),
    knetForm:  new FormGroup({
      cardToken: new FormControl('',[Validators.maxLength(8)]),
      ptlf: new FormControl('',[Validators.maxLength(45)]),
      language: new FormControl('en',[Validators.required,Validators.maxLength(2)]),
      userDefinedField1: new FormControl('',[Validators.maxLength(255)]),
      userDefinedField2: new FormControl('',[Validators.maxLength(255)]),
      userDefinedField3: new FormControl('',[Validators.maxLength(255)]),
      userDefinedField4: new FormControl('',[Validators.maxLength(255)]),
      userDefinedField5: new FormControl('',[Validators.maxLength(255)])
    }),
    qpayForm:  new FormGroup({
      description: new FormControl('Test Qpay Payment',[Validators.required, Validators.maxLength(255)]),
      nationalId: new FormControl('070AYY010BU234M',[Validators.maxLength(32)]),
      language: new FormControl('En',[Validators.maxLength(2)]),
      quantity: new FormControl(2,[Validators.min(1)])
    }),
    multibancoForm:  new FormGroup({
      paymentCountry: new FormControl('PT',[Validators.required, Validators.maxLength(2)]),
      accountHolderName: new FormControl('John Smith',[Validators.required, Validators.minLength(3),Validators.maxLength(100)]),
      billingDescriptor: new FormControl('Multibanco Test Payment',[Validators.maxLength(65534)])
    }),
    tamaraForm: new FormGroup({
      paymentCountry: new FormControl('PT',[Validators.required, Validators.maxLength(2)]),
      accountHolderName: new FormControl('John Smith',[Validators.required, Validators.minLength(3),Validators.maxLength(100)]),
      billingDescriptor: new FormControl('Multibanco Test Payment',[Validators.maxLength(65534)])
    }),
    description: new FormControl('Test Payment',[Validators.required, Validators.maxLength(100)]),
    purpose: new FormControl('Test Payment',[Validators.required, Validators.maxLength(27)]),
    paypalPlan: new FormControl('MERCHANT_INITIATED_BILLING')
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
  this.showPaypal = false;
  this.showQpay = false;
  this.showTrustly = false;
  this.showKnet = false;
  this.showBenefitPay =  false;

  switch(apm.target.value){
    case 'sofort':{
      this.showSofort = true;
      this.disableCardPaymentsFields();
      break;
    }
    case 'giropay':{
      this.showGiropay = true;
      this.disableCardPaymentsFields();
      this.checkoutdetails.controls.currency.setValue('EUR');
      this.checkoutdetails.controls.country.setValue('DE');
      this.apmToCountryCurrencyMappingValidator();
break;
    }
    case 'ideal':{
      this.showIdeal = true;
      this.disableCardPaymentsFields();
      this.checkoutdetails.controls.currency.setValue('EUR');
      this.checkoutdetails.controls.country.setValue('NL');
      this.apmToCountryCurrencyMappingValidator();
break;
    }
    case 'eps':{
      this.showEPS = true;
      this.disableCardPaymentsFields();
      this.checkoutdetails.controls.currency.setValue('EUR');
      this.checkoutdetails.controls.country.setValue('AT');
      this.apmToCountryCurrencyMappingValidator();
break;
    }
    case 'multibanco':{
      this.showMultibanco = true;
      this.disableCardPaymentsFields();
      this.checkoutdetails.controls.currency.setValue('EUR');
      this.checkoutdetails.controls.country.setValue('PT');
      this.apmToCountryCurrencyMappingValidator();
break;
    }
    case 'bancontact':{
      this.showBancontact = true;
      this.disableCardPaymentsFields();
      this.checkoutdetails.controls.country.setValue('BE');
      this.apmToCountryCurrencyMappingValidator();
break;
    }
    case 'p24':{
      this.showP24 = true;
      this.disableCardPaymentsFields();
      this.checkoutdetails.controls.country.setValue('PL');
      this.apmToCountryCurrencyMappingValidator();
break;
    }
    case 'trustly':{
      this.showTrustly = true;
      this.disableCardPaymentsFields();
      this.apmToCountryCurrencyMappingValidator();
break;
    }
    case 'knet':{
      this.showKnet = true;
      this.disableCardPaymentsFields();
      this.checkoutdetails.controls.country.setValue('KW');
      this.checkoutdetails.controls.currency.setValue('KWD');
      this.apmToCountryCurrencyMappingValidator();
break;
    }
    case 'qpay':{
      this.showQpay = true;
      this.disableCardPaymentsFields();
      this.checkoutdetails.controls.country.setValue('QA');
      this.checkoutdetails.controls.currency.setValue('QAR');
      this.apmToCountryCurrencyMappingValidator();
break;
    }
    case 'benefit':{
      this.showBenefitPay = true;
      this.disableCardPaymentsFields();
      this.checkoutdetails.controls.country.setValue('BH');
      this.checkoutdetails.controls.currency.setValue('BHD');
      this.apmToCountryCurrencyMappingValidator();
break;
    }
    case 'paypal':{
      this.showPaypal = true;
      this.disableCardPaymentsFields();
      this.apmToCountryCurrencyMappingValidator();
break;
    }
    case 'tamara':{
      this.showTamara = true;
      this.disableCardPaymentsFields();
      this.checkoutdetails.controls.country.setValue('SA');
      this.checkoutdetails.controls.currency.setValue('SAR');
      this.apmToCountryCurrencyMappingValidator();
break;
    }
    case 'klarna':{
      this.showKlarna = true;
      this.disableCardPaymentsFields();
      this.checkoutdetails.controls.country.setValue('DE');
      this.checkoutdetails.controls.currency.setValue('EUR');
      this.apmToCountryCurrencyMappingValidator();
      this.apmInvalid = true;
      this.alertService.info('Klarna is not yet available on NAS, Coming Soon!',this.options)
break;
    }
    case 'sepa':{
      this.apmInvalid = true;
      this.showSepa = true;
      this.disableCardPaymentsFields();
      this.checkoutdetails.controls.country.setValue('DE');
      this.checkoutdetails.controls.currency.setValue('EUR');
      this.apmToCountryCurrencyMappingValidator();
      this.apmInvalid = true;
      this.alertService.info('SEPA is not yet available on NAS, Coming Soon!',this.options)
break;
    }
    case 'frames':{
      this.showFrames = true;
      this.showAuthorizationType = true;
      this.showCapture = true;
      this.show3ds = true;
      this.apmToCountryCurrencyMappingValidator();
break;
    }
    default:{
      this.showFrames = true;
      this.showAuthorizationType = true;
      this.showCapture = true;
      this.show3ds = true;
      this.apmToCountryCurrencyMappingValidator();
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
        "purpose": "${this.checkoutdetails.controls.purpose.value}"
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
     break;
       }
       
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

      case 'bancontact':{
        sourceObject = 
        `
        {
        "type": "${this.checkoutdetails.controls.paymentMethod.value}",
        "payment_country": "${this.checkoutdetails.controls.bancontactForm.controls.paymentCountry.value}",
        "account_holder_name":"${this.checkoutdetails.controls.bancontactForm.controls.accountHolderName.value}",
        "billing_descriptor":"${this.checkoutdetails.controls.bancontactForm.controls.billingDescriptor.value}",
        "language":"${this.checkoutdetails.controls.bancontactForm.controls.language.value}"
     }`;
     break;
       }
       case 'knet':{
        sourceObject = 
        `
        {
        "type": "${this.checkoutdetails.controls.paymentMethod.value}",
        "language": "${this.checkoutdetails.controls.knetForm.controls.language.value}",
        "user_defined_field1":"${this.checkoutdetails.controls.knetForm.controls.userDefinedField1.value}",
        "user_defined_field2":"${this.checkoutdetails.controls.knetForm.controls.userDefinedField2.value}",
        "user_defined_field3":"${this.checkoutdetails.controls.knetForm.controls.userDefinedField3.value}",
        "user_defined_field4":"${this.checkoutdetails.controls.knetForm.controls.userDefinedField4.value}",
        "user_defined_field5":"${this.checkoutdetails.controls.knetForm.controls.userDefinedField5.value}",
        "card_token":"${this.checkoutdetails.controls.knetForm.controls.cardToken.value}",
        "ptlf":"${this.checkoutdetails.controls.knetForm.controls.ptlf.value}"
     }`;
     break;
       }
       case 'qpay':{
        sourceObject = 
        `
        {
        "type": "${this.checkoutdetails.controls.paymentMethod.value}",
        "quantity": "${this.checkoutdetails.controls.qpayForm.controls.quantity.value}",
        "description":"${this.checkoutdetails.controls.qpayForm.controls.description.value}",
        "language":"${this.checkoutdetails.controls.qpayForm.controls.language.value}",
        "national_id":"${this.checkoutdetails.controls.qpayForm.controls.nationalId.value}"
     }`;
     break;
      }
      case 'benefit':{
        sourceObject =      
        `
        {
        "type": "${this.checkoutdetails.controls.paymentMethod.value}"
     }`; 
     break;
      }
      case 'paypal':{
        sourceObject =      
        `
        {
        "type": "${this.checkoutdetails.controls.paymentMethod.value}",
        "plan": "${this.checkoutdetails.controls.paypalPlan.value}"
     }`;  
        break;
       }

       case 'multibanco':{
        sourceObject = 
        `
        {
        "type": "${this.checkoutdetails.controls.paymentMethod.value}",
        "payment_country": "${this.checkoutdetails.controls.multibancoForm.controls.paymentCountry.value}",
        "account_holder_name":"${this.checkoutdetails.controls.multibancoForm.controls.accountHolderName.value}",
        "billing_descriptor":"${this.checkoutdetails.controls.multibancoForm.controls.billingDescriptor.value}"
     }`;
     break;
       }

       case 'tamara':{
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
      "items":[
        {
           "name":"laptop",
           "unit_price":finalAmount,
           "quantity":1
        }
     ],
      "description": this.checkoutdetails.controls['description'].value,
     "reference": "Order"+ Math.floor(Math.random() * 1000) + 1,
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
        
        let queryParams = {
            'cko-session-id' : data.id 
        }
        const navigationExtras: NavigationExtras = {
          queryParams: queryParams,
          queryParamsHandling: 'merge',
          skipLocationChange:false
        };
        this.router.navigate(['/success'], navigationExtras);
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
  
 

  
 
 

