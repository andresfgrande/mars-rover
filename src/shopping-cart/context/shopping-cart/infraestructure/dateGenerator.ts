export class DateGenerator {
  getDate(): string {
    return new Date().toISOString();
  }
}
