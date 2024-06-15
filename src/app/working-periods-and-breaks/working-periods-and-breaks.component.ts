import { Component, Input } from '@angular/core';

import { PeriodDetailsComponent } from '../period-details/period-details.component';
import { WorkingTimeService } from '../common/working-time-calculation/working-time.service';

@Component({
  selector: 'app-working-periods-and-breaks',
  standalone: true,
  imports: [PeriodDetailsComponent],
  templateUrl: './working-periods-and-breaks.component.html',
})
export class WorkingPeriodsAndBreaksComponent {
  constructor(public workingTimeService: WorkingTimeService) {}
}
