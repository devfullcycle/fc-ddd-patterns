import { CustomerChangeAddressEvent } from "../../customer/event/customer-change-adress.event";
import { CustomerCreatedEvent } from "../../customer/event/customer-created.event";
import { CustomerChangeAddressHandler } from "../../customer/event/handler/customer-change-adress.handler";
import { CustomerCreatedHandleOne } from "../../customer/event/handler/user-created-1.handler";
import { CustomerCreatedHandleTwo } from "../../customer/event/handler/user-created-2.handler";
import Address from "../../customer/value-object/address";
import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      1
    );
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      0
    );
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeUndefined();
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product 1",
      description: "Product 1 description",
      price: 10.0,
    });

    // Quando o notify for executado o SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
  
  it("should call 2 customer handler when has customer created event", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandlerOne = new CustomerCreatedHandleOne();
    const spyEventHandlerOne = jest.spyOn(eventHandlerOne, "handle");
    const eventHandlerTwo = new CustomerCreatedHandleTwo();
    const spyEventHandlerTwo = jest.spyOn(eventHandlerTwo, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventHandlerOne);
    eventDispatcher.register("CustomerCreatedEvent", eventHandlerTwo);


    const productCreatedEvent = new CustomerCreatedEvent({
      name: "Jennysson Junior",
      roles: ["Admin"],
    });

    // Quando o notify for executado o SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandlerOne).toHaveBeenCalledTimes(1);
    expect(spyEventHandlerTwo).toHaveBeenCalledTimes(1);
  });
  
  it("should call a customer handler when has customer change address", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new CustomerChangeAddressHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");
    eventDispatcher.register("CustomerChangeAddressEvent", eventHandler);


    const endereco = new Address("rua a", 1, "49400000", "Aracaju")
    const productCreatedEvent = new CustomerChangeAddressEvent({
      id: "1",
      nome: "Jennysson Junior",
      endereco,
    });

    // Quando o notify for executado o SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalledTimes(1);
  });
});
