import Customer from "./customer";
import { CustomerCreated } from "./customer-created.event";
import { EnviaConsoleLog1Handler, EnviaConsoleLog2Handler } from "./customer-handlers";

describe("Customer Created Event unit tests", () => {

  it("should create customer and add CustomerCreated event", () => {
    const customer = new Customer("1", "Customer 1");

    expect(customer.id).toBe("1");
    expect(customer.name).toBe("Customer 1");
    expect(customer.getEvents()).toHaveLength(1);
    expect(customer.getEvents()[0]).toBeInstanceOf(CustomerCreated);
  });

  it("should dispatch CustomerCreated event with correct data", () => {
    const customer = new Customer("1", "Customer 1");
    const event = customer.getEvents()[0] as CustomerCreated;

    expect(event.aggregate_id).toBe("1");
    expect(event.name).toBe("Customer 1");
    expect(event.event_version).toBe(1);
    expect(event.occurred_on).toBeInstanceOf(Date);
  });

  it("should execute EnviaConsoleLog1Handler when CustomerCreated event is handled", () => {
    const customer = new Customer("1", "Customer 1");
    const event = customer.getEvents()[0] as CustomerCreated;
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    EnviaConsoleLog1Handler.handle(event);

    expect(consoleSpy).toHaveBeenCalledWith("Esse é o primeiro console.log do evento: CustomerCreated");
    consoleSpy.mockRestore();
  });

  it("should execute EnviaConsoleLog2Handler when CustomerCreated event is handled", () => {
    const customer = new Customer("1", "Customer 1");
    const event = customer.getEvents()[0] as CustomerCreated;
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    EnviaConsoleLog2Handler.handle(event);

    expect(consoleSpy).toHaveBeenCalledWith("Esse é o segundo console.log do evento: CustomerCreated");
    consoleSpy.mockRestore();
  });

  it("should execute all handlers for CustomerCreated event", () => {
    const customer = new Customer("1", "Customer 1");
    const event = customer.getEvents()[0] as CustomerCreated;
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    EnviaConsoleLog1Handler.handle(event);
    EnviaConsoleLog2Handler.handle(event);

    expect(consoleSpy).toHaveBeenCalledTimes(2);
    expect(consoleSpy).toHaveBeenNthCalledWith(1, "Esse é o primeiro console.log do evento: CustomerCreated");
    expect(consoleSpy).toHaveBeenNthCalledWith(2, "Esse é o segundo console.log do evento: CustomerCreated");
    consoleSpy.mockRestore();
  });

});