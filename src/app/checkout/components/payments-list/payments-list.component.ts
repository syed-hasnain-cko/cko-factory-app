import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CheckoutService } from '../../services/checkout.service';
import { CURRENCIES, WebhookEvents } from '../../data-store';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { PaymentDetailComponent } from '../payment-detail/payment-detail.component';
import { WebsocketService } from '../../services/websocket.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-payments-list',
  templateUrl: './payments-list.component.html',
  styleUrls: ['./payments-list.component.css']
})
export class PaymentsListComponent implements OnInit{

  orders: any[] = []; 
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['requested_on', 'id', 'amount', 'status', 'source'];
  isDataLoaded: boolean = false;
  @ViewChild(MatSort)
  sort!: MatSort;
  private websocketSubscription:Subscription[] = [];

  constructor(
    protected checkoutService: CheckoutService, private dialog: MatDialog, private websocketService: WebsocketService,
    private snackbar: MatSnackBar, private cd: ChangeDetectorRef
  ) {
   
  }

  ngOnInit(){
    
    let recordedOrders: string[] = JSON.parse(localStorage.getItem('payments') || '[]');
    if (recordedOrders !== null) {
      recordedOrders.forEach(paymentId => {
        this.checkoutService.getDetails(paymentId).subscribe(response => {
          if (!this.orders) {
            this.orders = [response]
          } else {
            this.orders.push(response);
          }
          this.orders.sort((a: { requested_on: string | Date; }, b: { requested_on: string | Date; }) => {
            let timestampA = new Date(a.requested_on);
            let timestampB = new Date(b.requested_on);
            if (timestampA < timestampB) return -1;
            if (timestampA > timestampB) return 1;
            return 0;
          });
          
          this.dataSource = new MatTableDataSource(this.orders);
          this.dataSource.sort = this.sort;
        })
        const subscription = this.websocketService.getMessageSubject().subscribe((webhook)=>{
 
          const payment = this.dataSource.data.find((payId) => payId.id === webhook?.data?.id);
          if(payment){
            this.setStatusOnWebhook(webhook,payment);
            this.dataSource._updateChangeSubscription();
          }      
        },
        (error)=>{
          console.error(`WebSocket error for ${paymentId}:`, error);
            this.showSnackbar(`WebSocket error for ${paymentId}: ${error.message}`);
        },
        () => {
        this.showSnackbar(`WebSocket connection closed for ${paymentId}`);
      }
        );
        this.websocketSubscription.push(subscription);
      }
      );
      this.isDataLoaded = true  
      
    }
     
  }

  ngOnDestroy() {
    this.websocketSubscription.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

   paymentMethodIcon(payment: any): string {
    return this.checkoutService.paymentMethodIcon(payment);
  }

   currencyBaseAmount(currencyCode: string) {
    let currency = CURRENCIES.find(currency => currency.iso4217 == currencyCode)
    if(currency != undefined){
      return currency.base;
    }
    return;
  }

  openDetailDialog(payment:any){
    this.dialog.open(PaymentDetailComponent, {
      width: '500px',
      data: {
        paymentData : payment
      }
    });
  }

  private setStatusOnWebhook(webhook: any, order:any){

    let webhookType  = Object.values(WebhookEvents).find(event => event == webhook.type);

    switch(webhookType){
      
      case WebhookEvents.Authorized : {
        order.status = 'Authorized';
        this.showSnackbar(`Payment status updated for ${webhook.data.id}: ${order.status}`);
        break;
      }
      case WebhookEvents.Pending : {
        order.status = 'Pending';
        this.showSnackbar(`Payment status updated for ${webhook.data.id}: ${order.status}`);
        break;
      }
      case WebhookEvents.Captured : {
        order.status = 'Captured';
        this.showSnackbar(`Payment status updated for ${webhook.data.id}: ${order.status}`);
        break;
      }
      case WebhookEvents.Refunded : {
        order.status = 'Refunded';
        this.showSnackbar(`Payment status updated for ${webhook.data.id}: ${order.status}`);
        break;
      }
      case WebhookEvents.CapturePending : {
        order.status = 'CapturePending';
        this.showSnackbar(`Payment status updated for ${webhook.data.id}: ${order.status}`);
        break;
      }
      case WebhookEvents.RefundPending : {
        order.status = 'RefundPending';
        this.showSnackbar(`Payment status updated for ${webhook.data.id}: ${order.status}`);
        break;
      }
      case WebhookEvents.CapturedDeclined : {
        order.status = 'CapturedDeclined';
        this.showSnackbar(`Payment status updated for ${webhook.data.id}: ${order.status}`);
        break;
      }
      case WebhookEvents.RefundDeclined : {
        order.status = 'RefundDeclined';
        this.showSnackbar(`Payment status updated for ${webhook.data.id}: ${order.status}`);
        break;
      }
      case WebhookEvents.Voided : {
        order.status = 'Voided';
        this.showSnackbar(`Payment status updated for ${webhook.data.id}: ${order.status}`);
        break;
      }
      case WebhookEvents.VoidDeclined : {
        order.status = 'VoidDeclined';
        this.showSnackbar(`Payment status updated for ${webhook.data.id}: ${order.status}`);
        break;
      }
      case WebhookEvents.Declined : {
        order.status = 'Declined';
        this.showSnackbar(`Payment status updated for ${webhook.data.id}: ${order.status}`);
        break;
      }
      case WebhookEvents.Expired : {
        order.status = 'Expired';
        this.showSnackbar(`Payment status updated for ${webhook.data.id}: ${order.status}`);
        break;
      }
      case WebhookEvents.Canceled : {
        order.status = 'Canceled';
        this.showSnackbar(`Payment status updated for ${webhook.data.id}: ${order.status}`);
        break;
      }

    }


  }

  private showSnackbar(message: string): void {
    this.snackbar.open(message, 'Close', {
      duration: 6000 
    });
  }




}
