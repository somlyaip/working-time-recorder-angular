import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingPeriodsAndBreaksComponent } from './working-periods-and-breaks.component';

describe('WorkingPeriodsAndBreaksComponent', () => {
  let component: WorkingPeriodsAndBreaksComponent;
  let fixture: ComponentFixture<WorkingPeriodsAndBreaksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkingPeriodsAndBreaksComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkingPeriodsAndBreaksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
