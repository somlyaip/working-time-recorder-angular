import {
  CanStartWorkingState,
  CanStopWorkingState,
  CanTakeABreakState,
  CanFinishBreakState,
  State,
} from './state-types';
import { Injectable } from '@angular/core';
import { WorkingTimeService } from '../working-time-calculation/working-time.service';
import NotWorkingState from './not-working-state';
import { Time } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class StateMachine {
  private actualState: State;

  constructor(private workingTimeService: WorkingTimeService) {
    this.actualState = new NotWorkingState();
  }

  // TODO: test all methods
  canStartWorking() {
    return 'startWorking' in this.actualState;
  }

  canStopWorking() {
    return 'stopWorking' in this.actualState;
  }

  canTakeABreak() {
    return 'takeABreak' in this.actualState;
  }

  canFinishBreak() {
    return 'finishBreak' in this.actualState;
  }

  startWorking(startTime: Time) {
    if (!this.canStartWorking()) {
      throw new Error(`Actual state cannot be started: ${this.actualState}`);
    }

    const canStartWorkingState = this.actualState as CanStartWorkingState;
    this.actualState = canStartWorkingState.startWorking(
      this.workingTimeService,
      startTime,
    );
  }

  stopWorking(endTime: Time) {
    if (!this.canStopWorking()) {
      throw new Error(`Actual state cannot be stopped: ${this.actualState}`);
    }

    const canStopWorkingState = this.actualState as CanStopWorkingState;
    this.actualState = canStopWorkingState.stopWorking(
      this.workingTimeService,
      endTime,
    );
  }

  takeABreak(breakStartTime: Time) {
    if (!this.canTakeABreak()) {
      throw new Error(
        `Cannot take a break in the current state: ${this.actualState}`,
      );
    }

    const canTakeABreakState = this.actualState as CanTakeABreakState;
    this.actualState = canTakeABreakState.takeABreak(
      this.workingTimeService,
      breakStartTime,
    );
  }

  finishBreak(breakEndTime: Time) {
    if (!this.canFinishBreak()) {
      throw new Error(
        `Cannot finish break in the current state: ${this.actualState}`,
      );
    }

    const canFinishBreakState = this.actualState as CanFinishBreakState;
    this.actualState = canFinishBreakState.finishBreak(
      this.workingTimeService,
      breakEndTime,
    );
  }
}
