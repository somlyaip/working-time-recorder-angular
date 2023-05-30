import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTimeModalComponent } from './input-time-modal.component';

describe('InputTimeModalComponent', () => {
  let component: InputTimeModalComponent;
  let fixture: ComponentFixture<InputTimeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputTimeModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputTimeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
