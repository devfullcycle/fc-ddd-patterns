import EventDispatcher from "../../@shared/event/event-dispatcher";
import Address from "../value-object/address";
import CustomerAddressChanged from "./customer-address-changed.event";
import EnviaConsoleLogHandler from "./handler/envia-console-log.handler";

describe("Domain events tests", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLogHandler();

    eventDispatcher.register("CustomerAddressChanged", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChanged"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerAddressChanged"].length).toBe(
      1
    );
    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChanged"][0]
    ).toMatchObject(eventHandler);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLogHandler();

    eventDispatcher.register("CustomerAddressChanged", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChanged"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister("CustomerAddressChanged", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChanged"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerAddressChanged"].length).toBe(
      0
    );
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLogHandler();

    eventDispatcher.register("CustomerAddressChanged", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChanged"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChanged"]
    ).toBeUndefined();
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLogHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("CustomerAddressChanged", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChanged"][0]
    ).toMatchObject(eventHandler);

    const productCreatedEvent = new CustomerAddressChanged({
      id: "id1",
      name: "Product 1",
      address: new Address("Rua 1", 123, "12300", "Cidade1")
    });

    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});
