import { CanFinishBreakState, CanStopWorkingState, State } from './state-types';
import { WorkingTimeService } from '../working-time-calculation/working-time.service';
import { Time } from '@angular/common';
import WorkingState from './working-state';
import NotWorkingState from './not-working-state';
import { replaceTime } from './utils';

export default class TakingBreakState
  implements CanFinishBreakState, CanStopWorkingState
{
  constructor(private startTime: Time) {}

  get name(): string {
    return 'Taking a break';
  }

  finishBreak(workingTimeService: WorkingTimeService, endTime: Time): State {
    workingTimeService.finishLastBreakPeriod(replaceTime(new Date(), endTime));
    return new WorkingState();
  }

  stopWorking(workingTimeService: WorkingTimeService, endTime: Time): State {
    workingTimeService.finishLastWorkingPeriod(
      replaceTime(new Date(), this.startTime),
    );
    workingTimeService.finishLastBreakPeriod(replaceTime(new Date(), endTime));
    return new NotWorkingState();
  }
}
