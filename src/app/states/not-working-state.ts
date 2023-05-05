import {CanStartWorkingState, State} from "./states";
import WorkingState from "./working-state";
import {WorkingTimeService} from "../working-time-calculation/working-time.service";

export default class NotWorkingState implements CanStartWorkingState {

  get name(): string {
    return "Not working";
  }

  startWorking(workingTimeService: WorkingTimeService): State {
    workingTimeService.startTime = new Date();
    return new WorkingState();
  }
}
