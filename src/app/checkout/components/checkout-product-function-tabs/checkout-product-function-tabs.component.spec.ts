import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutProductFunctionTabsComponent } from './checkout-product-function-tabs.component';

describe('CheckoutProductFunctionTabsComponent', () => {
  let component: CheckoutProductFunctionTabsComponent;
  let fixture: ComponentFixture<CheckoutProductFunctionTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutProductFunctionTabsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutProductFunctionTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
