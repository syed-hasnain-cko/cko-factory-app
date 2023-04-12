import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutSwitchingFunctionsTabComponent } from './checkout-switching-functions-tab.component';

describe('CheckoutSwitchingFunctionsTabComponent', () => {
  let component: CheckoutSwitchingFunctionsTabComponent;
  let fixture: ComponentFixture<CheckoutSwitchingFunctionsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutSwitchingFunctionsTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutSwitchingFunctionsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
