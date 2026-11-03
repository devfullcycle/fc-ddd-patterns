import { EnviaConsoleLogHandler } from "./customer-handlers";

export class CustomerAddressChanged {
    readonly occurred_on: Date
    readonly event_version: number = 1;

    constructor(
        readonly aggregate_id: string,
        readonly name: string,
        readonly address: string
    ){
        this.occurred_on = new Date();
        EnviaConsoleLogHandler.handle(this);
    }
}