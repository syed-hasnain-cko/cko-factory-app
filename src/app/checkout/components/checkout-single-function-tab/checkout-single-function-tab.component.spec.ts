import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutSingleFunctionTabComponent } from './checkout-single-function-tab.component';

describe('CheckoutSingleFunctionTabComponent', () => {
  let component: CheckoutSingleFunctionTabComponent;
  let fixture: ComponentFixture<CheckoutSingleFunctionTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutSingleFunctionTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutSingleFunctionTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
