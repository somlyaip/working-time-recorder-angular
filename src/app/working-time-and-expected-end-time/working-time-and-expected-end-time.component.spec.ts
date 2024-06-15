import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingTimeAndExpectedEndTimeComponent } from './working-time-and-expected-end-time.component';

describe('WorkingTimeAndExpectedEndTimeComponent', () => {
  let component: WorkingTimeAndExpectedEndTimeComponent;
  let fixture: ComponentFixture<WorkingTimeAndExpectedEndTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkingTimeAndExpectedEndTimeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkingTimeAndExpectedEndTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
