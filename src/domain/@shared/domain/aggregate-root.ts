import { IDomainEvent } from "./domain-event.interface";


export abstract class AgreggateRoot{
    events: Set<IDomainEvent> = new Set();

    addEvent(event: IDomainEvent){
        this.events.add(event);
    }   

    clearEvents(){
        this.events.clear();
    }
}