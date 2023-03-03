import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CheckoutService } from '../../services/checkout.service';
 
 
@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.css']
})
export class ResponseComponent implements OnInit {
  
  error: boolean = false;
  data: any ;
  path : string | undefined ;
  sessionId : string = "";
  constructor(private route: ActivatedRoute, private checkoutService:CheckoutService) { }
 
  ngOnInit() {
 
    this.path = this.route.snapshot.routeConfig?.path;
 
    if(this.path =='success'){
      this.route.queryParams
      .subscribe(params => {
        this.sessionId = params['cko-session-id'];
        this.checkoutService.getDetails(this.sessionId).subscribe((data:any)=>{
          console.log(data)
          this.data = data;
        },
        (error:any)=>{
          console.log(error)
          this.error = true;
        })
 
      }
    );
    }
    console.log(this.route)
 
  }
 
 
 
}
 

