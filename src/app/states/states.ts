import {WorkingTimeService} from "../working-time-calculation/working-time.service";

export interface State {
  get name(): string;
}

export interface CanStartWorkingState extends State {
  startWorking(workingTimeService: WorkingTimeService): State;
}

export interface CanStopWorkingState extends State {
  stopWorking(workingTimeService: WorkingTimeService): State;
}
