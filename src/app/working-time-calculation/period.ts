import { Time } from '@angular/common';
import Duration from './duration';

export default class Period {
  readonly #startDate: Date;
  #endDate: Date | undefined;

  public get startDate(): Date {
    return this.#startDate;
  }

  public get endDate(): Date | undefined {
    return this.#endDate;
  }

  constructor(startTime: Date, endTime: Date | undefined = undefined) {
    this.#startDate = startTime;
    this.#endDate = endTime;
  }

  set endDate(value: Date) {
    this.#endDate = value;
  }

  get totalMinutes(): number {
    if (this.#endDate === undefined) {
      return 0;
    }

    const millisecondsElapsed =
      this.#endDate.getTime() - this.#startDate.getTime();
    return Math.round(millisecondsElapsed / 1000 / 60);
  }

  toTime(): Time {
    const hours = Math.floor(this.totalMinutes / 60);
    return {
      hours: hours,
      minutes: this.totalMinutes - hours * 60,
    };
  }

  toDuration(): Duration {
    return new Duration(this.totalMinutes);
  }

  clone(): Period {
    return new Period(this.startDate, this.endDate);
  }
}
