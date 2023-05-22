import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BancontactSourceComponent } from './bancontact-source.component';

describe('BancontactSourceComponent', () => {
  let component: BancontactSourceComponent;
  let fixture: ComponentFixture<BancontactSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BancontactSourceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BancontactSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
