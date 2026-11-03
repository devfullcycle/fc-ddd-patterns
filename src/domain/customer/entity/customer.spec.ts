import Address from "../value-object/address";
import Customer from "./customer";
import { EnviaConsoleLogHandler, EnviaConsoleLog1Handler, EnviaConsoleLog2Handler } from "./customer-handlers";

describe("Customer unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      let customer = new Customer("", "John");
    }).toThrowError("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      let customer = new Customer("123", "");
    }).toThrowError("Name is required");
  });

  it("should change name", () => {
    // Arrange
    const customer = new Customer("123", "John");

    // Act
    customer.changeName("Jane");

    // Assert
    expect(customer.name).toBe("Jane");
  });

  it("should create an event", () => {
    // Arrange
    const handle1Spy = jest.spyOn(EnviaConsoleLog1Handler, "handle");
    const handle2Spy = jest.spyOn(EnviaConsoleLog2Handler, "handle");

    // Act
    const customer = new Customer("123", "John");

    // Assert
    expect(customer.id).toBe("123");
    expect(customer.name).toBe("John");
    expect(handle1Spy).toHaveBeenCalledTimes(1);
    expect(handle2Spy).toHaveBeenCalledTimes(1);
    handle1Spy.mockRestore();
    handle2Spy.mockRestore();
  });

  it("should change address", () => {
    // Arrange
    const customer = new Customer("123", "John");
    const handleSpy = jest.spyOn(EnviaConsoleLogHandler, "handle");

    // Act
    const address = new Address("Street 1", 123, "13330-250", "São Paulo");
    customer.changeAddress(address);

    // Assert
    expect(customer.Address.street).toBe("Street 1");
    expect(customer.Address.number).toBe(123);
    expect(customer.Address.zip).toBe("13330-250");
    expect(customer.Address.city).toBe("São Paulo");

    expect(handleSpy).toHaveBeenCalledTimes(1);
    handleSpy.mockRestore();
  });

  it("should activate customer", () => {
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 123, "13330-250", "São Paulo");
    customer.Address = address;

    customer.activate();

    expect(customer.isActive()).toBe(true);
  });

  it("should throw error when address is undefined when you activate a customer", () => {
    expect(() => {
      const customer = new Customer("1", "Customer 1");
      customer.activate();
    }).toThrowError("Address is mandatory to activate a customer");
  });

  it("should deactivate customer", () => {
    const customer = new Customer("1", "Customer 1");

    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  });

  it("should add reward points", () => {
    const customer = new Customer("1", "Customer 1");
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });

});
