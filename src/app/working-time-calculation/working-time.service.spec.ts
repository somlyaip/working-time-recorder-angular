import { TestBed } from '@angular/core/testing';

import {
  WorkingTimeService,
  DAILY_WORKING_MINUTES,
} from './working-time.service';

describe('WorkingTimeCalculatorService.calculateWorkingTimeRecord()', () => {
  let service: WorkingTimeService;

  let now: Date;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkingTimeService);
    now = new Date();
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

  it('should return undefined when there is no working period', () => {
    const result = service.calculateWorkingTimeRecord();

    expect(result).toBeUndefined();
  });

  it('should calculate time worked correctly when there are no break periods', () => {
    // Start a working period of 2 hours
    service.startNewWorkingPeriod(now);
    service.finishLastWorkingPeriod(
      new Date(now.getTime() + 2 * 60 * 60 * 1000),
    ); // Add 2 hours to date

    const result = service.calculateWorkingTimeRecord();

    expect(result).toBeDefined();
    expect(result?.worked.totalMinutes).toBe(120);
    expect(result?.overtime.totalMinutes).toBe(0);
  });

  it('should calculate overtime correctly', () => {
    // Start a working period of 9 hours
    service.startNewWorkingPeriod(now);
    service.finishLastWorkingPeriod(
      new Date(now.getTime() + 9 * 60 * 60 * 1000),
    );

    const result = service.calculateWorkingTimeRecord();

    expect(result).toBeDefined();
    expect(result?.worked.totalMinutes).toBe(540);
    expect(result?.overtime.totalMinutes).toBe(540 - DAILY_WORKING_MINUTES);
  });

  it('should subtract break time from total working time', () => {
    // Start a working period of 9 hours
    service.startNewWorkingPeriod(now);
    service.finishLastWorkingPeriod(
      new Date(now.getTime() + 9 * 60 * 60 * 1000),
    );

    // Take a break of 1 hour
    service.startNewBreakPeriod(new Date(now.getTime() + 4 * 60 * 60 * 1000));
    service.finishLastBreakPeriod(new Date(now.getTime() + 5 * 60 * 60 * 1000));

    const result = service.calculateWorkingTimeRecord();

    expect(result).toBeDefined();
    expect(result?.worked.totalMinutes).toBe(480); // 9 hours - 1 hour
    expect(result?.overtime.totalMinutes).toBe(480 - DAILY_WORKING_MINUTES);
  });
});
