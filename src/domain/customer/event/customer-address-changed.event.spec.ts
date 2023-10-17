import EventDispatcher from "../../@shared/event/event-dispatcher";
import Customer from "../entity/customer";
import Address from "../value-object/address";
import CustomerAddressChangedEvent from "./customer-address-changed.event";
import { EnviaConsoleLogHandler } from "./handler/enviar-console-log.handler";

describe("Customer Address Changed events tests", () => {
    it("Print customer's address when it is changed",()=>{
        const customer = new Customer("1", "Customer 1");
        customer.Address = new Address("Rua Lobo",23,"888888-888","Rio de Janeiro");    
        const address = new Address("Rua Eduardo Suza",23,"888888-888","Rio de Janeiro"); 
        customer.changeAddress(address);
        expect(address).toBe(customer.Address);    

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EnviaConsoleLogHandler();    
        const spyEventHandler = jest.spyOn(eventHandler, "handle");    
        eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"].length).toBe(1);        
        const customerAddressChangedEvent = new CustomerAddressChangedEvent(customer);
        eventDispatcher.notify(customerAddressChangedEvent);
        expect(spyEventHandler).toBeCalled();

    }); 
});