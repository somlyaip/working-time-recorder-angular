import { Component } from '@angular/core';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styles: [
  ]
})
export class StatusBarComponent {
  isWorkingNow: boolean = false;

  toggleIsWorkingNow() {
    this.isWorkingNow = !this.isWorkingNow;
  }
}
