import { Component, Input, ViewChild } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { WorkingTimeService } from '../working-time-calculation/working-time.service';
import WorkingTimeRecord from '../working-time-calculation/working-time-record';
import { StateMachine } from '../states/state-machine';
import { InputTimeModalComponent } from '../input-time-modal/input-time-modal.component';
import { Time } from '@angular/common';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
})
export class StatusBarComponent {
  isWorkingNow: boolean = false;

  @Input() workingTimeRecord: WorkingTimeRecord | undefined;

  @Output() workingTimeRecordUpdated = new EventEmitter<
    WorkingTimeRecord | undefined
  >();

  @ViewChild('inputTimeModal') inputTimeModal!: InputTimeModalComponent;

  constructor(
    private workingTimeService: WorkingTimeService,
    public stateMachine: StateMachine,
  ) {}

  startWorking() {
    this.inputTimeModal.show((startTime: Time) => {
      console.log(startTime);
      this.stateMachine.startWorking(startTime);
      this.calculateWorkingTimeRecord();
      this.isWorkingNow = true;
    });
  }

  stopWorking() {
    this.inputTimeModal.show((endTime: Time) => {
      console.log(endTime);
      this.stateMachine.stopWorking(endTime);
      this.calculateWorkingTimeRecord();
      this.isWorkingNow = false;
    });
  }

  calculateWorkingTimeRecord() {
    this.workingTimeRecord =
      this.workingTimeService.calculateWorkingTimeRecord();
    this.workingTimeRecordUpdated.emit(this.workingTimeRecord);
  }
}
