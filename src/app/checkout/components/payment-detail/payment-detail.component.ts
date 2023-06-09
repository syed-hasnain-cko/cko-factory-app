import { Component, Inject, OnInit, Optional } from '@angular/core';
import { ICurrency } from '../../interfaces/currency-interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CheckoutService } from '../../services/checkout.service';


@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.css'],


})
export class PaymentDetailComponent implements OnInit{

  paymentDetails: FormGroup = new FormGroup({});
  isCardPayment: boolean = false;
  refundDisabled: boolean = true;
  captureDisabled: boolean = true;
  voidDisabled: boolean = true;
  incrementAuthDisabled: boolean = true;
  dataModel : any;

  constructor(
    @Optional() public dialogRef: MatDialogRef<PaymentDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public paymentData: any,
    private _formBuilder: FormBuilder,
    protected checkoutService: CheckoutService
  ) { }


  ngOnInit() {

    this.dataModel = this.paymentData.paymentData;
    console.log(this.dataModel)
  
   this.isCardPayment = this.dataModel.source.type == 'card' ? true : false;
   console.log(this.dataModel.source.type)
   console.log(this.isCardPayment)

    this.paymentDetails = new FormGroup({
      paymentId: new FormControl(this.dataModel.id),
      amount: new FormControl(this.dataModel.amount),
      currency:new FormControl(this.dataModel.currency),
      status: new FormControl(this.dataModel.status),
      customerName : new FormControl(this.dataModel.customer.name),
      customerEmail: new FormControl(this.dataModel.customer.email),
      reference: new FormControl(this.dataModel.reference),
      expiryMonth: new FormControl(this.isCardPayment? this.dataModel.source.expiry_month : 'N/A'),
      expiryYear: new FormControl(this.isCardPayment? this.dataModel.source.expiry_year : 'N/A'),
      paymentMethod: new FormControl(this.isCardPayment ? this.dataModel.source.scheme : this.dataModel.source.type),
      last4: new FormControl(this.isCardPayment ? this.dataModel.source.last4 : 'N/A'),
      bin: new FormControl(this.isCardPayment ? this.dataModel.source.bin : 'N/A'),
      issuerCountry: new FormControl(this.isCardPayment? this.dataModel.source.issuer_country : 'N/A'),
      cardType: new FormControl(this.isCardPayment? this.dataModel.source.card_type : 'N/A')
    });

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  paymentMethodIcon(payment: any): string {
    return this.checkoutService.paymentMethodIcon(payment);
  }

}
