export default class OrderItem {
  private _id: string;
  private _productId: string;
  private _name: string;
  private _price: number;
  private _quantity: number;
  private _total: number;

  constructor(
    id: string,
    name: string,
    price: number,
    productId: string,
    quantity: number
  ) {
    this._id = id;
    this._name = name;
    this._price = price;
    this._productId = productId;
    this._quantity = quantity;
    this._total = this.total();
  }

  validate() {
		if (!this._id) {
			throw new Error("Id is required");
		}

		if (!this._productId) {
			throw new Error("ProductId is required");
		}

		if (!this._name) {
			throw new Error("Name is required");
		}

		if (this._price <= 0) {
			throw new Error("Price must be greater than zero");
		}

		if (this._quantity <= 0) {
			throw new Error("Quantity must be greater than zero");
		}
	}

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get productId(): string {
    return this._productId;
  }

  get quantity(): number {
    return this._quantity;
  }

  get price(): number {
    return this._price;
  }

  total(): number {
    return this._price * this._quantity
  }
}
