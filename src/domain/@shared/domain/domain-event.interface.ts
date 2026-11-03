export interface IDomainEvent{
    aggregate_id: string;
    occurred_on: Date
    event_version: number;
}