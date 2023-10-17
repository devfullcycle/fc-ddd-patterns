import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";


export class EnviaConsoleLogHandler implements EventHandlerInterface<CustomerCreatedEvent>{
    handle(event: CustomerCreatedEvent): void {
        if(!event.eventData.Address || !event.eventData.id || !event.eventData.name) throw Error("id, name or address is empty");
        
        if(event.eventData.Address != event.eventData.OldAddress)
            console.log(`Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${event.eventData.Address.toString()}`)
    }
    
}