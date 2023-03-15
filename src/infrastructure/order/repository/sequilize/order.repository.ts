import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async update(entity: Order): Promise<void> {
    await OrderItemModel.destroy({
      where: { order_id: entity.id },
    });

    await entity.items.forEach(async (orderItem) => {
      await OrderItemModel.create({
        id: orderItem.id,
        name: orderItem.name,
        price: orderItem.price,
        product_id: orderItem.productId,
        quantity: orderItem.quantity,
        order_id: entity.id
      });
    });
  }
  async find(id: string): Promise<Order> {
    const order = await OrderModel.findOne({
      where: { id },
      include: [{ model: OrderItemModel, as: "items" }],
    });
    return this.modelToDomain(order);
  }
  async findAll(): Promise<Order[]> {
    const orders = await OrderModel.findAll({
      include: [{ model: OrderItemModel, as: "items" }],
    });
    return orders.map((orderModel) => this.modelToDomain(orderModel));
  }
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  private modelToDomain(model: OrderModel) {
    return new Order(
      model.id,
      model.customer_id,
      model.items.map(
        (modelItem) =>
          new OrderItem(
            modelItem.id,
            modelItem.name,
            modelItem.price,
            modelItem.product_id,
            modelItem.quantity
          )
      )
    );
  }
}
