export default class Duration {

  readonly #totalMinutes: number;

  constructor(totalMinutes: number) {
    this.#totalMinutes = totalMinutes;
  }

  get totalMinutes() {
    return this.#totalMinutes;
  }

  get hours() {
    return Math.floor(this.totalMinutes / 60);
  }

  get minutes(): number {
    return this.totalMinutes - this.hours * 60;
  }
}
