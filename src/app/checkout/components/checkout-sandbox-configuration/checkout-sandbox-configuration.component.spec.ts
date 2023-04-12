import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutSandboxConfigurationComponent } from './checkout-sandbox-configuration.component';

describe('CheckoutSandboxConfigurationComponent', () => {
  let component: CheckoutSandboxConfigurationComponent;
  let fixture: ComponentFixture<CheckoutSandboxConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutSandboxConfigurationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutSandboxConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
