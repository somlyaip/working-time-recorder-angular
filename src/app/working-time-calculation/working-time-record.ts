import Duration from "./duration";

export default interface WorkingTimeRecord {
  worked: Duration;
  normalWorkingTime: Duration;
  remained: Duration;
  overtime: Duration;
}
