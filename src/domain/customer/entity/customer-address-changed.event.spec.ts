import { CustomerAddressChanged } from "./customer-address-changed.event";
import { EnviaConsoleLogHandler } from "./customer-handlers";

describe("Customer Address Changed Event unit tests", () => {

  it("should create CustomerAddressChanged event with correct data", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    const event = new CustomerAddressChanged("1", "Customer 1", "City 1, Street 1, 123, 13330-250");

    expect(event.aggregate_id).toBe("1");
    expect(event.name).toBe("Customer 1");
    expect(event.address).toBe("City 1, Street 1, 123, 13330-250");
    expect(event.event_version).toBe(1);
    expect(event.occurred_on).toBeInstanceOf(Date);
    consoleSpy.mockRestore();
  });

  it("should execute EnviaConsoleLogHandler when CustomerAddressChanged is created", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    new CustomerAddressChanged("1", "Customer 1", "City 1, Street 1, 123, 13330-250");

    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledWith(expect.any(String));
    consoleSpy.mockRestore();
  });

  it("should pass the event instance to EnviaConsoleLogHandler when CustomerAddressChanged is created", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    const handleSpy = jest.spyOn(EnviaConsoleLogHandler, "handle");

    const event = new CustomerAddressChanged("1", "Customer 1", "City 1, Street 1, 123, 13330-250");

    expect(handleSpy).toHaveBeenCalledTimes(1);
    expect(handleSpy).toHaveBeenCalledWith(event);
    consoleSpy.mockRestore();
    handleSpy.mockRestore();
  });

});