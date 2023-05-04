import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SofortSourceComponent } from './sofort-source.component';

describe('SofortSourceComponent', () => {
  let component: SofortSourceComponent;
  let fixture: ComponentFixture<SofortSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SofortSourceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SofortSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
