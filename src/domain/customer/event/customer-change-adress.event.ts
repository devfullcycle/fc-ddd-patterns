import EventInterface from "../../@shared/event/event.interface";
import Address from "../value-object/address";

export class CustomerChangeAddressEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: any;
  
  constructor(eventData: {
    id: string,
    nome: string,
    endereco: Address
  }) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }
}