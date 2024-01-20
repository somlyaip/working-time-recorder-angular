import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingTimeChartComponent } from './working-time-chart.component';

describe('WorkingTimeChartComponent', () => {
  let component: WorkingTimeChartComponent;
  let fixture: ComponentFixture<WorkingTimeChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkingTimeChartComponent],
      declarations: [],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkingTimeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
