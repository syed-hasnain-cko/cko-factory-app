import { Component,
  ContentChildren,
  QueryList,
  AfterContentInit } from '@angular/core';

  import { CheckoutSingleFunctionTabComponent } from '../checkout-single-function-tab/checkout-single-function-tab.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout-switching-functions-tab',
  templateUrl: './checkout-switching-functions-tab.component.html',
  styleUrls: ['./checkout-switching-functions-tab.component.css']
})
export class CheckoutSwitchingFunctionsTabComponent implements AfterContentInit {
  @ContentChildren(CheckoutSingleFunctionTabComponent) tabs: QueryList<CheckoutSingleFunctionTabComponent> = new QueryList<CheckoutSingleFunctionTabComponent>();
  
  constructor(protected route: ActivatedRoute){

  }
  // contentChildren are set
  ngAfterContentInit() {
    // get all active tabs
    let activeTabs = this.tabs.filter((tab)=>tab.active);
    // if there is no active tab set, activate the first
    if(activeTabs.length === 0) {
      this.selectTab(this.tabs.toArray()[1]);
    }
  }
  
  selectTab(tab: CheckoutSingleFunctionTabComponent){
    // deactivate all tabs
    this.tabs.toArray().forEach(t => t.active = false);
    
    // activate the tab the user has clicked on.
    tab.active = true;
  }
}
