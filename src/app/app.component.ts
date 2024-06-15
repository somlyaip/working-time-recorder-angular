import { Component, OnDestroy } from '@angular/core';
import WorkingTimeRecord from './common/working-time-calculation/working-time-record';
import { WorkingTimeService } from './common/working-time-calculation/working-time.service';
import { Time } from '@angular/common';
import Duration from './common/working-time-calculation/duration';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy {
  title = 'working-time-recorder-angular';
  isWorkingNow: boolean = false;
  workingTimeRecord: WorkingTimeRecord | undefined;
  timerId: any;
  workedSoFar: Duration | undefined;
  expectedEndTimeOfWork: Time | undefined;

  constructor(private workingTimeService: WorkingTimeService) {}

  ngOnDestroy(): void {
    this.setIsWorkingToFalseAndFinishWorkingTimer();
  }

  updateWorkingTimeRecord(workingTimeRecord: WorkingTimeRecord | undefined) {
    this.workingTimeRecord = workingTimeRecord;
  }

  workStartedOrBreakFinished() {
    this.calculateWorkingTimeRecord();
    this.setIsWorkingToTrueAndStartWorkingTimer();

    if (!this.workedSoFar) {
      this.updateWorkedSoFar();
    }
  }

  workFinishedOrBreakTaken() {
    this.calculateWorkingTimeRecord();
    this.setIsWorkingToFalseAndFinishWorkingTimer();
  }

  calculateWorkingTimeRecord() {
    this.workingTimeRecord =
      this.workingTimeService.calculateWorkingTimeRecord();
  }

  private setIsWorkingToTrueAndStartWorkingTimer() {
    this.isWorkingNow = true;
    this.timerId = setInterval(() => {
      this.updateWorkedSoFar();
    }, 10000);
  }

  private updateWorkedSoFar() {
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
