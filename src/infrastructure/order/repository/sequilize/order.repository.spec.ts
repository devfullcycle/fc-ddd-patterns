import { Sequelize } from "sequelize-typescript";
import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";
import Product from "../../../../domain/product/entity/product";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import ProductModel from "../../../product/repository/sequelize/product.model";
import ProductRepository from "../../../product/repository/sequelize/product.repository";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";
import OrderRepository from "./order.repository";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  function getCustomerWithAddress() {
    const customer = new Customer("123", "John Doe");
		const address = new Address("Wilkie Way", 4290, "94306", "Palo Alto, CA");
		customer.changeAddress(address);
		
		return customer;
  }
  

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", "123", [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: "123",
          product_id: "123",
        },
      ],
    });
  });

  it("Should update items and the total orders", async () => {
    const customerRepository = new CustomerRepository();
		const productRepository = new ProductRepository();
		const orderRepository = new OrderRepository();

    const customer = getCustomerWithAddress();
		await customerRepository.create(customer);

    const product1 = new Product("23", "Shoes", 259.99);
		const product2 = new Product("24", "Shirt", 89.99);
		const product3 = new Product("25", "Pack of socks", 19.99);

    await productRepository.create(product1);
		await productRepository.create(product2);
		await productRepository.create(product3);

    const orderItem1 = new OrderItem("247", "Order Item 1", product1.price, product1.id, 1);
		const orderItem2 = new OrderItem("248", "Order Item 2", product2.price, product2.id, 2);
    const orderItem3 = new OrderItem("249", "Order Item 3", product3.price, product3.id, 1);

    const order = new Order("329", customer.id, [orderItem1, orderItem2, orderItem3]);

    await orderRepository.create(order);

    await orderRepository.update(order);

    const orderFromDB = await OrderModel.findOne({
			where: { id: order.id },
			include: ["items"],
		});

    expect(orderFromDB?.items.length).toBe(3);
		expect(orderFromDB?.total).toBe(order.total());

  });
});

