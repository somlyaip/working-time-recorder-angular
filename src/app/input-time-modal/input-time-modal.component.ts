import {Component} from '@angular/core';
import {Time} from "@angular/common";

@Component({
  selector: 'app-input-time-modal',
  templateUrl: './input-time-modal.component.html'
})
export class InputTimeModalComponent {

  isOpen = false;
  hours = '';
  minutes = '';

  callback?: (time: Time) => void;

  show(callback: (time: Time) => void) {
    this.isOpen = true;
    this.callback = callback;

    const now = new Date();
    this.hours = now.getHours().toString().padStart(2, '0');
    this.minutes = now.getMinutes().toString().padStart(2, '0');
  }

  close() {
    this.isOpen = false;
  }

  ok() {
    this.close();

    if (this.hours && this.minutes) {
      if (typeof this.callback != 'function') {
        console.log(`callback is not a function. It is: '${typeof this.callback}'`);
        return;
      }

      this.callback({
        hours: Number(this.hours),
        minutes: Number(this.minutes)
      });
    }
  }
}
