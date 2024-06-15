import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { InputTimeModalComponent } from '../common/input-time-modal/input-time-modal.component';
import { Time } from '@angular/common';
import { StateMachine } from '../common/states/state-machine';

@Component({
  selector: 'app-controls-bar',
  templateUrl: './controls-bar.component.html',
})
export class ControlsBarComponent {

  @Output() workStartedOrBreakFinished = new EventEmitter<void>();
  @Output() workFinishedOrBreakTaken = new EventEmitter<void>();

  @ViewChild('inputTimeModal') inputTimeModal!: InputTimeModalComponent;

  constructor(public stateMachine: StateMachine) {}

  startWorking() {
    this.inputTimeModal.show((startTime: Time) => {
      this.stateMachine.startWorking(startTime);
      this.workStartedOrBreakFinished.emit();
    });
  }

  stopWorking() {
    this.inputTimeModal.show((endTime: Time) => {
      this.stateMachine.stopWorking(endTime);
      this.workFinishedOrBreakTaken.emit();
    });
  }

  takeABreak() {
    this.inputTimeModal.show((startTime: Time) => {
      this.stateMachine.takeABreak(startTime);
      this.workFinishedOrBreakTaken.emit();
    });
  }

  finishBreak() {
    this.inputTimeModal.show((endTime: Time) => {
      this.stateMachine.finishBreak(endTime);
      this.workStartedOrBreakFinished.emit();
    });
  }
}
