import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
})
export class StatusBarComponent {
  @Input() isWorkingNow: boolean = false;
}
