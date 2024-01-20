import { TestBed } from '@angular/core/testing';

import { WorkingTimeService } from './working-time.service';

describe('WorkingTimeCalculatorService', () => {
  let service: WorkingTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkingTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('calculate record with remaining', () => {
    service.startNewWorkingPeriod(new Date('2023-05-01T08:00:00Z'));
    service.finishLastWorkingPeriod(new Date('2023-05-01T15:51:00Z'));
    const workingTimeRecord = service.calculateWorkingTimeRecord();
    expect(workingTimeRecord?.worked.hours).toEqual(7);
    expect(workingTimeRecord?.worked.minutes).toEqual(51);
    expect(workingTimeRecord?.remained.minutes).toEqual(9);
    expect(workingTimeRecord?.overtime.totalMinutes).toEqual(0);
  });

  it('calculate record with overtime', () => {
    service.startNewWorkingPeriod(new Date('2023-05-01T09:02:00Z'));
    service.finishLastWorkingPeriod(new Date('2023-05-01T18:05:00Z'));
    const workingTimeRecord = service.calculateWorkingTimeRecord();
    expect(workingTimeRecord?.worked.hours).toEqual(9);
    expect(workingTimeRecord?.worked.minutes).toEqual(3);
    expect(workingTimeRecord?.remained.totalMinutes).toEqual(0);
    expect(workingTimeRecord?.overtime.hours).toEqual(1);
    expect(workingTimeRecord?.overtime.minutes).toEqual(3);
  });
});
