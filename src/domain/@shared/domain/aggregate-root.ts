export abstract class AgreggateRoot {
  private _events: any[] = [];

  addEvent(event: any): void {
    this._events.push(event);
  }

  getEvents(): any[] {
    return this._events;
  }

  clearEvents(): void {
    this._events = [];
  }
}