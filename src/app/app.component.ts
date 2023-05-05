import { Component } from '@angular/core';
import WorkingTimeRecord from "./working-time-calculation/working-time-record";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'working-time-recorder-angular';
  workingTimeRecord: WorkingTimeRecord | undefined;

  updateWorkingTimeRecord(workingTimeRecord: WorkingTimeRecord | undefined) {
    this.workingTimeRecord = workingTimeRecord;
  }
}
