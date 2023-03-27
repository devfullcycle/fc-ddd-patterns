import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import { CustomerChangeAddressEvent } from "../customer-change-adress.event";
import { CustomerCreatedEvent } from "../customer-created.event";

export class CustomerChangeAddressHandler
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  handle({eventData}: CustomerChangeAddressEvent): void {
    console.log(`Endereço do cliente: ${eventData.id}, ${eventData.nome} alterado para: ${eventData.endereco}`);
  }
}

