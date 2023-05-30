import {CanFinishBreakState, CanStopWorkingState, State} from "./state-types";
import {WorkingTimeService} from "../working-time-calculation/working-time.service";
import {Time} from "@angular/common";
import WorkingState from "./working-state";
import NotWorkingState from "./not-working-state";

export default class TakingBreakState implements CanFinishBreakState, CanStopWorkingState {

  get name(): string {
    return "Taking a break";
  }

  finishBreak(workingTimeService: WorkingTimeService, endTime: Time): State {
    // TODO: store end of break and start of work
    return new WorkingState();
  }

  stopWorking(workingTimeService: WorkingTimeService, endTime: Time): State {
    // TODO: store end of work using break start time
    return new NotWorkingState();
  }
}
