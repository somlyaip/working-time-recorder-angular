import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import Period from '../working-time-calculation/period';

@Component({
  selector: 'app-period-details',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './period-details.component.html',
})
export class PeriodDetailsComponent {
  @Input() period: Period | undefined;
}
