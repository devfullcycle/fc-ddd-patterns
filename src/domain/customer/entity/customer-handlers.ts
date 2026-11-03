import { CustomerCreated } from "./customer-created.event";
import { CustomerAddressChanged } from "./customer-address-changed.event";

class EnviaConsoleLogHandler {
  static handle(event: CustomerAddressChanged): void {
    console.log(`Endereço do cliente: ${event.aggregate_id}, ${event.name} alterado para: ${event.address}`);
  }
}
class EnviaConsoleLog1Handler {
  static handle(event: CustomerCreated): void {
    console.log("Esse é o primeiro console.log do evento: CustomerCreated");
  }
}

class EnviaConsoleLog2Handler {
  static handle(event: CustomerCreated): void {
    console.log("Esse é o segundo console.log do evento: CustomerCreated");
  }
}

export { EnviaConsoleLogHandler, EnviaConsoleLog1Handler, EnviaConsoleLog2Handler };