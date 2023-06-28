import EventInterface from "../../@shared/event/event.interface";
import Address from "../value-object/address";

type CustomerAddressChangedEventData = {
  id: string
  name: string
  address: Address
}

export default class CustomerAddressChanged implements EventInterface {
  dataTimeOccurred: Date;
  eventData: CustomerAddressChangedEventData;

  constructor(eventData: CustomerAddressChangedEventData) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }
}
