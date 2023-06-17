import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CheckoutService } from '../../services/checkout.service';
import { WebsocketService } from '../../services/websocket.service';
import { Subscription, tap } from 'rxjs';
import { WebhookEvents } from '../../data-store';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.css'],


})
export class PaymentDetailComponent implements OnInit{

 
  isProcessing: boolean = false;
  isCardPayment: boolean = false;
  refundDisabled: boolean = true;
  captureDisabled: boolean = true;
  voidDisabled: boolean = true;
  incrementAuthDisabled: boolean = true;
  dataModel : any;
  private websocketSubscription!: Subscription;

  constructor(
    @Optional() public dialogRef: MatDialogRef<PaymentDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public paymentData: any,
    private _formBuilder: FormBuilder,
    protected checkoutService: CheckoutService,
    protected websocketService : WebsocketService,
    private snackbar: MatSnackBar
  ) { }

  paymentDetails!: FormGroup;

  ngOnInit() {

    this.dataModel = this.paymentData.paymentData;
    this.setActionLinks(this.dataModel);
    this.isCardPayment = this.dataModel?.source.type == 'card' ? true : false;

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

    this.websocketSubscription = this.websocketService.connect(this.dataModel.id).pipe(
      tap(
        ()=>{
          this.isProcessing = false;
        }
      )
    )
      .subscribe(
        (data) => {
          let webhook = JSON.parse(data);
          this.setActionLinks(webhook);
          this.setStatusOnWebhook(webhook.type);
        },
        (error) => {
          console.error('WebSocket error:', error);
          this.showSnackbar('WebSocket error: ' + error.message);
        },
        () => {
          console.log('WebSocket connection closed');
          this.showSnackbar('WebSocket connection closed');
        }
      )

  }

  ngOnDestroy() {
    this.websocketSubscription.unsubscribe();
    this.websocketService.disconnect();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  paymentMethodIcon(payment: any): string {
    return this.checkoutService.paymentMethodIcon(payment);
  }

  executePaymentAction(uri: any, paymentId: any){
    this.isProcessing = true;
    this.checkoutService.executePaymentAction(uri,paymentId).subscribe(response=>{
     });
  }

  private showSnackbar(message: string): void {
    this.snackbar.open(message, 'Close', {
      duration: 5000 
    });
  }

  private setStatusOnWebhook(webhookEvent : string){

    let webhookType  = Object.values(WebhookEvents).find(event => event == webhookEvent);

    switch(webhookType){
      
      case WebhookEvents.Authorized : {
        this.paymentDetails.controls['status'].setValue('Authroized');
        this.showSnackbar('Payment status updated: Authroized');
        break;
      }
      case WebhookEvents.Pending : {
        this.paymentDetails.controls['status'].setValue('Pending');
        this.showSnackbar('Payment status updated: Pending');
        break;
      }
      case WebhookEvents.Captured : {
        this.paymentDetails.controls['status'].setValue('Captured');
        this.showSnackbar('Payment status updated: Captured');
        break;
      }
      case WebhookEvents.Refunded : {
        this.paymentDetails.controls['status'].setValue('Refunded');
        this.showSnackbar('Payment status updated: Refunded');
        break;
      }
      case WebhookEvents.CapturePending : {
        this.paymentDetails.controls['status'].setValue('Capture Pending');
        this.showSnackbar('Payment status updated: Capture Pending');
        break;
      }
      case WebhookEvents.RefundPending : {
        this.paymentDetails.controls['status'].setValue('Refund Pending');
        this.showSnackbar('Payment status updated: Refund Pending');
        break;
      }
      case WebhookEvents.CapturedDeclined : {
        this.paymentDetails.controls['status'].setValue('Capture Declined');
        this.showSnackbar('Payment status updated: Capture Declined');
        break;
      }
      case WebhookEvents.RefundDeclined : {
        this.paymentDetails.controls['status'].setValue('Refund Declined');
        this.showSnackbar('Payment status updated: Refund Declined');
        break;
      }
      case WebhookEvents.Voided : {
        this.paymentDetails.controls['status'].setValue('Voided');
        this.showSnackbar('Payment status updated: Voided');
        break;
      }
      case WebhookEvents.VoidDeclined : {
        this.paymentDetails.controls['status'].setValue('Void Declined');
        this.showSnackbar('Payment status updated: Void Declined');
        break;
      }
      case WebhookEvents.Declined : {
        this.paymentDetails.controls['status'].setValue('Declined');
        this.showSnackbar('Payment status updated: Declined');
        break;
      }
      case WebhookEvents.Expired : {
        this.paymentDetails.controls['status'].setValue('Expired');
        this.showSnackbar('Payment status updated: Expired');
        break;
      }
      case WebhookEvents.Canceled : {
        this.paymentDetails.controls['status'].setValue('Canceled');
        this.showSnackbar('Payment status updated: Canceled');
        break;
      }

    }
  }

 setActionLinks(payment:any){
  this.dataModel._links = payment?._links;
  this.refundDisabled = payment?._links?.refund?.href ? false : true;
  this.captureDisabled = payment?._links?.capture?.href ? false : true;
  this.voidDisabled = payment._links?.void?.href ? false : true;
  this.incrementAuthDisabled = payment?._links?.authorizations?.href ? false : true;
 }
}
