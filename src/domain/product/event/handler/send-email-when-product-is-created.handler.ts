import EventHandlerInterface from "@/domain/@shared/event/event-handler.interface";
import { ProductCreatedEvent } from "@/domain/product/event";

export default class SendEmailWhenProductIsCreatedHandler
  implements EventHandlerInterface<ProductCreatedEvent>
{
  handle(event: ProductCreatedEvent): void {
    console.log(`Sending email to .....`);
  }
}
