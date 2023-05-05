import {CanStopWorkingState, State} from "./states";
import NotWorkingState from "./not-working-state";
import {WorkingTimeService} from "../working-time-calculation/working-time.service";

export default class WorkingState implements CanStopWorkingState {

  get name(): string {
    return "Working";
  }

  stopWorking(workingTimeService: WorkingTimeService): State {
    workingTimeService.endTime = new Date();
    return new NotWorkingState();
  }
}
