import EventDispatcher from "../../@shared/event/event-dispatcher";
import Customer from "../entity/customer";
import Address from "../value-object/address";
import CustomerCreatedEvent from "./customer-created.event";
import { EnviaConsoleLogHandler } from "./handler/enviar-console-log.handler";
import { EnviaConsoleLog1Handler } from "./handler/enviar-console-log1.handler";
import { EnviaConsoleLog2Handler } from "./handler/enviar-console-log2.handler";

describe("Customer Created events tests", () => {
    it("Print two logs when customer is created",()=>{
        const eventDispatcher = new EventDispatcher();

        const eventHandler = new EnviaConsoleLog1Handler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");
        eventDispatcher.register("CustomerCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(1);
    
        const eventHandler2 = new EnviaConsoleLog2Handler();
        const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);

        const customer = new Customer("1", "Customer 1");
        const customerCreatedEvent = new CustomerCreatedEvent(customer);
        eventDispatcher.notify(customerCreatedEvent);
        expect(spyEventHandler).toBeCalled();
        expect(spyEventHandler2).toBeCalled();
    });
});