import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultibancoSourceComponent } from './multibanco-source.component';

describe('MultibancoSourceComponent', () => {
  let component: MultibancoSourceComponent;
  let fixture: ComponentFixture<MultibancoSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultibancoSourceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultibancoSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
