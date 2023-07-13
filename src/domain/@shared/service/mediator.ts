

export class Mediator{

    eventEmitter: EventEmitter;

    register(eventName, listener){
        this.eventEmitter.on(eventName, listener);
    }

    async publish(aggregate_root: AggregateRoot){
        const events = aggregate_root.events
        for(const event of events){
            await this.eventEmitter.emitAsync(event.constructor.name);
        }
    }

}