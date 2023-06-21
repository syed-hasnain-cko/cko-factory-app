import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SepaSourceComponent } from './sepa-source.component';

describe('SepaSourceComponent', () => {
  let component: SepaSourceComponent;
  let fixture: ComponentFixture<SepaSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SepaSourceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SepaSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
