import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P24SourceComponent } from './p24-source.component';

describe('P24SourceComponent', () => {
  let component: P24SourceComponent;
  let fixture: ComponentFixture<P24SourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ P24SourceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(P24SourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
