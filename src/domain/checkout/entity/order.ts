import OrderItem from "./order_item";

export default class Order {
    private _id: string;
    private _customerId: string;
    private _items: OrderItem[];
    private _total: number;
    private _status: string;

    constructor(id: string, customerId: string, items: OrderItem[]) {
        this._id = id;
        this._customerId = customerId;
        this._items = items;
        this._total = this.total();
        this._status = "CREATED";
        this.validate();
    }

    get id(): string {
        return this._id;
    }

    get customerId(): string {
        return this._customerId;
    }

    get status(): string {
        return this._status;
    }

    changeStatus(status: string): void {
        this._status = status;
    }

    get items(): OrderItem[] {
        return this._items;
    }

    validate(): boolean {
        if (this._id.length === 0) {
            throw new Error("Id is required");
        }
        if (this._customerId.length === 0) {
            throw new Error("CustomerId is required");
        }
        if (this._items.length === 0) {
            throw new Error("Items are required");
        }

        if (this._items.some((item) => item.quantity <= 0)) {
            throw new Error("Quantity must be greater than 0");
        }

        return true;
    }

    total(): number {
        return this._items.reduce((acc, item) => acc + item.total(), 0);
    }
}
