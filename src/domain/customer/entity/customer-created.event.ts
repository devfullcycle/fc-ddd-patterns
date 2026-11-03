import { EnviaConsoleLog1Handler, EnviaConsoleLog2Handler } from "./customer-handlers";

export class CustomerCreated {
    readonly occurred_on: Date
    readonly event_version: number = 1;

    constructor(
        readonly aggregate_id: string,
        readonly name: string
    ){
        this.occurred_on = new Date();
        EnviaConsoleLog1Handler.handle(this);
        EnviaConsoleLog2Handler.handle(this);
    }
}