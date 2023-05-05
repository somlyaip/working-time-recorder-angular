import { Injectable } from '@angular/core';
import WorkingTimeRecord from "./working-time-record";
import Duration from "./duration";

export const DAILY_WORKING_HOURS = 8;
export const DAILY_WORKING_MINUTES = DAILY_WORKING_HOURS * 60;

@Injectable({
  providedIn: 'root'
})
export class WorkingTimeService {

  startTime?: Date;
  endTime?: Date;

  // TODO: use optional or any other solution instead of ... | undefined
  calculateWorkingTimeRecord(): WorkingTimeRecord | undefined {
    if (this.startTime === undefined || this.endTime === undefined) {
      console.log('Both startTime and endTime must be set before start recalculation');
      return undefined;
    }

    const millisecondsElapsed = this.endTime.getTime() - this.startTime.getTime();
    const minutesWorked = Math.round(millisecondsElapsed / 1000 / 60);

    let workedDuration = new Duration(minutesWorked);
    return {
      worked: workedDuration,
      normalWorkingTime: minutesWorked <= DAILY_WORKING_MINUTES ?
        workedDuration :
        new Duration(DAILY_WORKING_MINUTES),
      remained: minutesWorked < DAILY_WORKING_MINUTES ?
        new Duration(DAILY_WORKING_MINUTES - minutesWorked) :
        new Duration(0),
      overtime: minutesWorked > DAILY_WORKING_MINUTES ?
        new Duration(minutesWorked - DAILY_WORKING_MINUTES) :
        new Duration(0),
    };
  }
}
