import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header/header.component';
import { InputTimeModalComponent } from './input-time-modal/input-time-modal.component';
import { StatusBarComponent } from './status-bar/status-bar.component';
import { WorkingTimeChartComponent } from './working-time-chart/working-time-chart.component';
import { AppComponent } from './app.component';
import { WorkingPeriodsAndBreaksComponent } from 'src/app/working-periods-and-breaks/working-periods-and-breaks.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        WorkingTimeChartComponent,
        WorkingPeriodsAndBreaksComponent,
      ],
      declarations: [
        AppComponent,
        HeaderComponent,
        InputTimeModalComponent,
        StatusBarComponent,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'working-time-recorder-angular'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('working-time-recorder-angular');
  });
});
