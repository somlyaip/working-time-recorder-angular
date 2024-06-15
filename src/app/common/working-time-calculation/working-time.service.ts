import { Injectable } from '@angular/core';
import WorkingTimeRecord from './working-time-record';
import Duration from './duration';
import Period from './period';

export const DAILY_WORKING_HOURS = 8;
export const DAILY_WORKING_MINUTES = DAILY_WORKING_HOURS * 60;

@Injectable({
  providedIn: 'root',
})
export class WorkingTimeService {
  #workingPeriods = new Array<Period>();
  #takingBreakPeriods = new Array<Period>();

  get workingPeriods() {
    return this.#workingPeriods;
  }

  get takingBreakPeriods() {
    return this.#takingBreakPeriods;
  }

  startNewWorkingPeriod(startDate: Date) {
    this.#workingPeriods.push(new Period(startDate));
  }

  finishLastWorkingPeriod(endDate: Date) {
    this.#workingPeriods[this.#workingPeriods.length - 1].endDate = endDate;
  }

  startNewBreakPeriod(startDate: Date) {
    this.#takingBreakPeriods.push(new Period(startDate));
  }

  finishLastBreakPeriod(endDate: Date) {
    this.#takingBreakPeriods[this.#takingBreakPeriods.length - 1].endDate =
      endDate;
  }

  // TODO: use optional or any other solution instead of ... | undefined
  calculateWorkingTimeRecord(): WorkingTimeRecord | undefined {
    if (this.#workingPeriods.length == 0) {
      console.error(
        'You have to set at least one working period before start recalculation',
      );
      return undefined;
    }

    let overallMinutes = 0;
    this.#workingPeriods.forEach((p) => (overallMinutes += p.totalMinutes));
    let minutesNotWorked = 0;
    this.#takingBreakPeriods.forEach(
      (p) => (minutesNotWorked += p.totalMinutes),
    );
    let minutesWorked = overallMinutes - minutesNotWorked;
    if (minutesWorked < 0) {
      minutesWorked = 0;
    }
    const workedDuration = new Duration(minutesWorked);

    return {
      worked: workedDuration,
      normalWorkingTime:
        minutesWorked <= DAILY_WORKING_MINUTES
          ? workedDuration
          : new Duration(DAILY_WORKING_MINUTES),
      remained:
        minutesWorked < DAILY_WORKING_MINUTES
          ? new Duration(DAILY_WORKING_MINUTES - minutesWorked)
          : new Duration(0),
      overtime:
        minutesWorked > DAILY_WORKING_MINUTES
          ? new Duration(minutesWorked - DAILY_WORKING_MINUTES)
          : new Duration(0),
    };
  }

  clone(): WorkingTimeService {
    const clonedOne = new WorkingTimeService();
    clonedOne.#takingBreakPeriods = [...this.#takingBreakPeriods.map(p => p.clone())];
    clonedOne.#workingPeriods = [...this.#workingPeriods.map(p => p.clone())];
    return clonedOne;
  }
}
