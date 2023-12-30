import { EventInterface } from ".";
export default interface EventHandlerInterface<T extends EventInterface=EventInterface> {
    handle(event: T): void;
}