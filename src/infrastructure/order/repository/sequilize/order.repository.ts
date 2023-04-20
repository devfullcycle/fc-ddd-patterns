import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

export default class OrderRepository {
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
  async update(entity: Order): Promise<void>{
    await OrderModel.update(
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
      { where: { id: entity.id } }
    );
  }
  async find(id: string): Promise<Order> {
    let orderModel;
    try {
      orderModel = await OrderModel.findOne({
        where: {
          id,
        },
        rejectOnEmpty: true,
        include : [{ model: OrderItemModel }]
      });
    } catch (error) {
      throw new Error("Order not found");
    }
    const orderItems = orderModel.items.map((item: OrderItemModel) => {
      return new OrderItem(
        item.id,
        item.name,
        item.price,
        item.product_id,
        item.quantity
        ) 
    })
    const order = new Order(orderModel.id, orderModel.customer_id, orderItems)
    return order;
  }
  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({include : [{ model: OrderItemModel }]});
    return orderModels.map((orderModel) =>
      new Order(orderModel.id, orderModel.customer_id, orderModel.items.map((orderItem) => {
        return new OrderItem(orderItem.id, orderItem.name, orderItem.price, orderItem.product_id, orderItem.quantity)
      }))
    );
  }
}
