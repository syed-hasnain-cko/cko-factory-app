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
  errorResponse : any;
  data: any ;
  path : string | undefined ;
  sessionId : string = "";
  constructor(private route: ActivatedRoute, private checkoutService:CheckoutService) { }
 
  ngOnInit() {
    console.log(this.route)
    this.path = this.route.snapshot.routeConfig?.path=='success/:cko-session-id'?'success':undefined;
 
    if(this.path =='success'){
      this.sessionId = this.route.snapshot.params['cko-session-id']
        
        this.checkoutService.getDetails(this.sessionId).subscribe({next:(data:any)=>{
          console.log(data)
          this.data = data;
        },
        error:(error:any)=>{
          this.errorResponse = error
          this.error = true;
        }
      //})
 
      }
    );
    }
    console.log(this.route)
 
  }
 
 
 
}
 

