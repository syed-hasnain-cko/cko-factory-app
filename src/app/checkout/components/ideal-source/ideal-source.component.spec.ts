import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdealSourceComponent } from './ideal-source.component';

describe('IdealSourceComponent', () => {
  let component: IdealSourceComponent;
  let fixture: ComponentFixture<IdealSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdealSourceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdealSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
