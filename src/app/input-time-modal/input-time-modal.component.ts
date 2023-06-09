import {Component} from '@angular/core';
import {Time} from "@angular/common";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-input-time-modal',
  templateUrl: './input-time-modal.component.html'
})
export class InputTimeModalComponent {

  isOpen = false;
  timeForm = new FormGroup({
    hours: new FormControl(''),
    minutes: new FormControl('')
  });

  callback?: (time: Time) => void;

  show(callback: (time: Time) => void) {
    this.isOpen = true;
    this.callback = callback;

    const now = new Date();
    this.timeForm.setValue({
      hours: now.getHours().toString().padStart(2, '0'),
      minutes: now.getMinutes().toString().padStart(2, '0')
    });
  }

  close() {
    this.isOpen = false;
  }

  ok() {
    this.close();

    if (this.timeForm.valid) {
      if (typeof this.callback != 'function') {
        console.log(`callback is not a function. It is: '${typeof this.callback}'`);
        return;
      }

      this.callback({
        hours: Number(this.timeForm.value.hours),
        minutes: Number(this.timeForm.value.minutes)
      });
    }
  }
}
