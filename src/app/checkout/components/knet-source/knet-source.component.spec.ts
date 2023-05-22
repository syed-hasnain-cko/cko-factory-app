import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnetSourceComponent } from './knet-source.component';

describe('KnetSourceComponent', () => {
  let component: KnetSourceComponent;
  let fixture: ComponentFixture<KnetSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KnetSourceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KnetSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
