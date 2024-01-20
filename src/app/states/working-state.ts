import { CanTakeABreakState, CanStopWorkingState, State } from './state-types';
import NotWorkingState from './not-working-state';
import { WorkingTimeService } from '../working-time-calculation/working-time.service';
import { Time } from '@angular/common';
import { replaceTime } from './utils';
import TakingBreakState from './taking-break-state';

export default class WorkingState
  implements CanStopWorkingState, CanTakeABreakState
{
  get name(): string {
    return 'Working';
  }

  // TODO: test it
  stopWorking(workingTimeService: WorkingTimeService, endTime: Time): State {
    workingTimeService.finishLastWorkingPeriod(
      replaceTime(new Date(), endTime),
    );
    return new NotWorkingState();
  }

  // TODO: test it
  takeABreak(workingTimeService: WorkingTimeService, startTime: Time): State {
    workingTimeService.startNewBreakPeriod(
      replaceTime(new Date(), startTime)
    );
    return new TakingBreakState(startTime);
  }
}
