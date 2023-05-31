import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QpaySourceComponent } from './qpay-source.component';

describe('QpaySourceComponent', () => {
  let component: QpaySourceComponent;
  let fixture: ComponentFixture<QpaySourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QpaySourceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QpaySourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
