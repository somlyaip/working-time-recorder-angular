import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StatusBarComponent } from './status-bar/status-bar.component';
import { HeaderComponent } from './header/header.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { WorkingTimeChartComponent } from './working-time-chart/working-time-chart.component';
import { InputTimeModalComponent } from './input-time-modal/input-time-modal.component';
import { WorkingPeriodsAndBreaksComponent } from './working-periods-and-breaks/working-periods-and-breaks.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    StatusBarComponent,
    HeaderComponent,
    InputTimeModalComponent,
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
    WorkingPeriodsAndBreaksComponent,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
