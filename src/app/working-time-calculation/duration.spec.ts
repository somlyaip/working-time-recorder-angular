import Duration from './duration';

describe('Duration', () => {
  it('using 40 m returns 0 h and 40 m', () => {
    const duration = new Duration(40);
    expect(duration.hours).toEqual(0);
    expect(duration.minutes).toEqual(40);
  });

  it('using 135 m returns 2 h and 15 m', () => {
    const duration = new Duration(135);
    expect(duration.hours).toEqual(2);
    expect(duration.minutes).toEqual(15);
  });
});
