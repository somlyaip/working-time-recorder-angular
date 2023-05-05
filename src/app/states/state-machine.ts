import {CanStartWorkingState, CanStopWorkingState, State} from "./states";
import {Injectable} from "@angular/core";
import {WorkingTimeService} from "../working-time-calculation/working-time.service";
import NotWorkingState from "./not-working-state";

@Injectable({
  providedIn: 'root'
})
export class StateMachine {

  private actualState: State;

  constructor(private workingTimeService: WorkingTimeService) {
    this.actualState = new NotWorkingState();
  }

  canStartWorking() {
    return 'startWorking' in this.actualState;
  }

  canStopWorking() {
    return 'stopWorking' in this.actualState;
  }

  startWorking() {
    if (! this.canStartWorking()) {
      throw new Error(`Actual state cannot be started: ${this.actualState}`)
    }

    const canStartWorkingState = this.actualState as CanStartWorkingState;
    this.actualState = canStartWorkingState.startWorking(this.workingTimeService);
  }

  stopWorking() {
    if (! this.canStopWorking()) {
      throw new Error(`Actual state cannot be stopped: ${this.actualState}`)
    }

    const canStopWorkingState = this.actualState as CanStopWorkingState;
    this.actualState = canStopWorkingState.stopWorking(this.workingTimeService);
  }
}
