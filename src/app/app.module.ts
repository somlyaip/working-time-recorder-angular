import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StatusBarComponent } from './status-bar/status-bar.component';
import { HeaderComponent } from './header/header.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { WorkingTimeChartComponent } from './working-time-chart/working-time-chart.component';
import { WorkingPeriodsAndBreaksComponent } from './working-periods-and-breaks/working-periods-and-breaks.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WorkingTimeAndExpectedEndTimeComponent } from './working-time-and-expected-end-time/working-time-and-expected-end-time.component';
import { ControlsBarComponent } from './controls-bar/controls-bar.component';
import { InputTimeModalComponent } from './common/input-time-modal/input-time-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    StatusBarComponent,
    HeaderComponent,
    InputTimeModalComponent,
    ControlsBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxEchartsModule.forRoot({
      /**
       * This will import all modules from echarts.
       * If you only need custom modules,
       * please refer to [Custom Build] section.
       */
      echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
    }),
    WorkingTimeChartComponent,
    WorkingTimeAndExpectedEndTimeComponent,
    WorkingPeriodsAndBreaksComponent,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
