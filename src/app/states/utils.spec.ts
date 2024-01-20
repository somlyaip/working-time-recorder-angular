import { replaceTime } from './utils';

describe('replaceTime', () => {
  it('should replaces hours and minutes', () => {
    const inputDate = new Date('2023-05-06T08:45:20Z');

    const outputDate = replaceTime(inputDate, { hours: 11, minutes: 9 });

    expect(outputDate.getFullYear()).toEqual(2023);
    expect(outputDate.getMonth() + 1).toEqual(5); // getMonth()'s result is an index
    expect(outputDate.getDay()).toEqual(6);

    expect(outputDate.getHours()).toEqual(11);
    expect(outputDate.getMinutes()).toEqual(9);
    expect(outputDate.getSeconds()).toEqual(0);
  });
});
