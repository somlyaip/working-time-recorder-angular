import { Component, Input } from '@angular/core';
import Duration from '../common/working-time-calculation/duration';
import { Time } from '@angular/common';

@Component({
  selector: 'app-working-time-and-expected-end-time',
  standalone: true,
  imports: [],
  templateUrl: './working-time-and-expected-end-time.component.html'
})
export class WorkingTimeAndExpectedEndTimeComponent {
  @Input() isWorkingNow: boolean = false;
  @Input() workedSoFar: Duration | undefined;
  @Input() expectedEndTimeOfWork: Time | undefined;
}
