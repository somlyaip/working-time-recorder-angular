import {Component} from '@angular/core';
import {Time} from "@angular/common";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-input-time-modal',
  templateUrl: './input-time-modal.component.html'
})
export class InputTimeModalComponent {

  isOpen = false;
  hours = new FormControl('');
  minutes = new FormControl('');

  callback?: (time: Time) => void;

  show(callback: (time: Time) => void) {
    this.isOpen = true;
    this.callback = callback;

    const now = new Date();
    this.hours.setValue(now.getHours().toString().padStart(2, '0'));
    this.minutes.setValue(now.getMinutes().toString().padStart(2, '0'));
  }

  close() {
    this.isOpen = false;
  }

  ok() {
    this.close();

    // TODO: validate it
    if (this.hours.value && this.minutes.value) {
      if (typeof this.callback != 'function') {
        console.log(`callback is not a function. It is: '${typeof this.callback}'`);
        return;
      }

      this.callback({
        hours: Number(this.hours.value),
        minutes: Number(this.minutes.value)
      });
    }
  }
}
