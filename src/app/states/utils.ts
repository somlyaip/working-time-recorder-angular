import {Time} from "@angular/common";

export function replaceTime(date: Date, time: Time): Date {
  date.setHours(time.hours);
  date.setMinutes(time.minutes);
  date.setSeconds(0);

  return date;
}
