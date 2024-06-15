import { Component, Input, OnDestroy, ViewChild } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { WorkingTimeService } from '../working-time-calculation/working-time.service';
import WorkingTimeRecord from '../working-time-calculation/working-time-record';
import { StateMachine } from '../states/state-machine';
import { InputTimeModalComponent } from '../input-time-modal/input-time-modal.component';
import { Time } from '@angular/common';
import Duration from '../working-time-calculation/duration';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
})
export class StatusBarComponent implements OnDestroy {

  @Input() workingTimeRecord: WorkingTimeRecord | undefined;

  @Output() workingTimeRecordUpdated = new EventEmitter<
    WorkingTimeRecord | undefined
  >();

  @ViewChild('inputTimeModal') inputTimeModal!: InputTimeModalComponent;

  isWorkingNow: boolean = false;
  timerId: any;
  workedSoFar: Duration | undefined;
  expectedEndTimeOfWork: Time | undefined;

  constructor(
    private workingTimeService: WorkingTimeService,
    public stateMachine: StateMachine,
  ) {}

  startWorking() {
    this.inputTimeModal.show((startTime: Time) => {
      console.log(startTime);
      this.stateMachine.startWorking(startTime);
      this.calculateWorkingTimeRecord();
      this.setIsWorkingToTrueAndStartWorkingTimer();
    });
  }

  stopWorking() {
    this.inputTimeModal.show((endTime: Time) => {
      console.log(endTime);
      this.stateMachine.stopWorking(endTime);
      this.calculateWorkingTimeRecord();
      this.setIsWorkingToFalseAndFinishWorkingTimer();
    });
  }

  takeABreak() {
    this.inputTimeModal.show((startTime: Time) => {
      console.log(startTime);
      this.stateMachine.takeABreak(startTime);
      this.calculateWorkingTimeRecord();
      this.setIsWorkingToFalseAndFinishWorkingTimer();
    });
  }

  finishBreak() {
    this.inputTimeModal.show((endTime: Time) => {
      console.log(endTime);
      this.stateMachine.finishBreak(endTime);
      this.calculateWorkingTimeRecord();
      this.setIsWorkingToTrueAndStartWorkingTimer();
    });
  }

  calculateWorkingTimeRecord() {
    this.workingTimeRecord =
      this.workingTimeService.calculateWorkingTimeRecord();
    this.workedSoFar = this.workingTimeRecord?.worked;
    this.workingTimeRecordUpdated.emit(this.workingTimeRecord);
  }

  ngOnDestroy(): void {
    this.setIsWorkingToFalseAndFinishWorkingTimer();
  }

  private setIsWorkingToTrueAndStartWorkingTimer() {
    this.isWorkingNow = true;
    this.timerId = setInterval(() => {
      this.updateWorkedSoFar();
    }, 10000);
  }

  private updateWorkedSoFar() {
    console.log('Tick');
    const tmpService = this.workingTimeService.clone();
    tmpService.finishLastWorkingPeriod(new Date());
    const calculatedRecord = tmpService.calculateWorkingTimeRecord();
    this.workedSoFar = calculatedRecord?.worked;

    if (calculatedRecord && calculatedRecord.remained.totalMinutes > 0) {
      this.expectedEndTimeOfWork =
        this.getNowIncrementedWith(calculatedRecord?.remained);
    } else {
      this.expectedEndTimeOfWork = undefined;
    }
  }

  private getNowIncrementedWith(duration: Duration): Time {
    const incremented = new Date();
    const millisecondsToAdd = duration.totalMinutes * 60 * 1000;
    incremented.setTime(incremented.getTime() + millisecondsToAdd);
    return {
      hours: incremented.getHours(),
      minutes: incremented.getMinutes()
    };
  }

  private setIsWorkingToFalseAndFinishWorkingTimer() {
    this.isWorkingNow = false;
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }
}
