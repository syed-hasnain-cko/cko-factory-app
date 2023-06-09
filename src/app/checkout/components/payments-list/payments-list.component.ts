import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CheckoutService } from '../../services/checkout.service';
import { CURRENCIES } from '../../data-store';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { PaymentDetailComponent } from '../payment-detail/payment-detail.component';

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

  constructor(
    protected checkoutService: CheckoutService, private dialog: MatDialog
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
      });
      this.isDataLoaded = true  
    }
     
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


}
