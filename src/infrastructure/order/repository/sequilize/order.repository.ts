
import Order from "../../../../domain/checkout/entity/order";
import OrderItem  from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

export default class OrderRepository implements OrderRepositoryInterface{
  private async updateItems(orderId:string, items: OrderItem[]): Promise<void> {
    await OrderItemModel.destroy({
      where:{
        order_id: orderId
      }
    });
    for (const item of items) {
      await OrderItemModel.create({
        order_id: orderId,
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity,
      });
    }
  }
  async update(entity: Order): Promise<void> {
    await OrderModel.update(
      {
        customer_id: entity.customerId,
        total: entity.total(),
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
    await this.updateItems(entity.id,entity.items);
  }
  async find(id: string): Promise<Order> {
    const order = await OrderModel.findOne({
      where: { id: id },
      include: ["items"],
    });

    return order.toJSON();
  }
  async findAll(): Promise<Order[]> {
    const orders = await OrderModel.findAll({
      include: ["items"],
    });

    return orders.map(p=>{
      return p.toJSON();
    });
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
}
