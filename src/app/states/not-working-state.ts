import {CanStartWorkingState, State} from "./state-types";
import WorkingState from "./working-state";
import {WorkingTimeService} from "../working-time-calculation/working-time.service";
import {Time} from "@angular/common";
import {replaceTime} from "./utils";

export default class NotWorkingState implements CanStartWorkingState {

  get name(): string {
    return "Not working";
  }

  // TODO: test it
  startWorking(workingTimeService: WorkingTimeService, startTime: Time): State {
    workingTimeService.startTime = replaceTime(new Date(), startTime);
    return new WorkingState();
  }
}
