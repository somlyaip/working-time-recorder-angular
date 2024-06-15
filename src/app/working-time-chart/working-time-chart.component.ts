import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgxEchartsModule, NGX_ECHARTS_CONFIG } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import WorkingTimeRecord from '../common/working-time-calculation/working-time-record';

import Duration from '../common/working-time-calculation/duration';
import { DAILY_WORKING_MINUTES } from '../common/working-time-calculation/working-time.service';

@Component({
  standalone: true,
  selector: 'app-working-time-chart',
  templateUrl: './working-time-chart.component.html',
  imports: [NgxEchartsModule],
  providers: [
    {
      provide: NGX_ECHARTS_CONFIG,
      useFactory: () => ({ echarts: () => import('echarts') }),
    },
  ],
})
export class WorkingTimeChartComponent implements OnChanges {
  @Input() workingTimeRecord: WorkingTimeRecord | undefined;

  chartOptions: EChartsOption;
  constructor() {
    this.chartOptions = {};
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.workingTimeRecord === undefined) {
      this.chartOptions = {};
      return;
    }

    this.chartOptions = {
      tooltip: {
        trigger: 'item',
        formatter: (params) => {
          // @ts-ignore
          const duration = new Duration(params.data.value);
          // @ts-ignore
          return `<span class="font-bold">${params.data.name}</span>: ${duration.hours} h ${duration.minutes} m`;
        },
      },
      series: [
        {
          type: 'pie',
          radius: ['50%', '70%'],
          center: ['50%', '70%'],
          // adjust the start angle
          startAngle: 180,
          label: {
            show: false,
          },
          data: [
            {
              value: this.workingTimeRecord?.normalWorkingTime?.totalMinutes,
              name:
                this.workingTimeRecord?.overtime?.totalMinutes > 0
                  ? 'Normal worktime'
                  : 'Worked',
            },
            {
              value: this.workingTimeRecord?.remained?.totalMinutes,
              name: 'Remained',
            },
            {
              value: this.workingTimeRecord?.overtime?.totalMinutes,
              name: 'Overtime',
            },
            {
              // make an invisible record to fill the bottom n%
              value:
                DAILY_WORKING_MINUTES -
                this.workingTimeRecord?.overtime?.totalMinutes,
              itemStyle: {
                // stop the working-time-chart from rendering this piece
                color: 'none',
                decal: {
                  symbol: 'none',
                },
              },
              label: {
                show: false,
              },
            },
          ],
        },
      ],
      color: ['#fcd34d', '#eee', 'red'],
    };
  }
}
