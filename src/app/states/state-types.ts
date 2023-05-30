import {WorkingTimeService} from "../working-time-calculation/working-time.service";
import {Time} from "@angular/common";

export interface State {
  get name(): string;
}

export interface CanStartWorkingState extends State {
  startWorking(workingTimeService: WorkingTimeService, startTime: Time): State;
}

export interface CanStopWorkingState extends State {
  stopWorking(workingTimeService: WorkingTimeService, endTime: Time): State;
}

export interface CanTakeBreakState extends State {
  takeBreak(workingTimeService: WorkingTimeService, startTime: Time): State;
}

export interface CanFinishBreakState extends State {
  finishBreak(workingTimeService: WorkingTimeService, endTime: Time): State;
}
