import {Component, Input} from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { WorkingTimeService } from "../working-time-calculation/working-time.service";
import WorkingTimeRecord from "../working-time-calculation/working-time-record";
import {StateMachine} from "../states/state-machine";

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
})
export class StatusBarComponent {
  isWorkingNow: boolean = false;

  @Input() workingTimeRecord: WorkingTimeRecord | undefined;

  @Output() workingTimeRecordUpdated =
    new EventEmitter<WorkingTimeRecord | undefined>();

  constructor(private workingTimeService: WorkingTimeService, public stateMachine: StateMachine) {
  }

  calculateWorkingTimeRecord() {
    this.workingTimeRecord = this.workingTimeService.calculateWorkingTimeRecord();
    this.workingTimeRecordUpdated.emit(this.workingTimeRecord);
  }
}
