import {CanStopWorkingState, State} from "./state-types";
import NotWorkingState from "./not-working-state";
import {WorkingTimeService} from "../working-time-calculation/working-time.service";
import {Time} from "@angular/common";
import {replaceTime} from "./utils";

export default class WorkingState implements CanStopWorkingState {

  get name(): string {
    return "Working";
  }

  // TODO: test it
  stopWorking(workingTimeService: WorkingTimeService, endTime: Time): State {
    workingTimeService.endTime = replaceTime(new Date(), endTime);
    return new NotWorkingState();
  }
}
