import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

export default class OrderRepository implements OrderRepositoryInterface {
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
  async update(entity: Order): Promise<void> {
    await OrderModel.update(
      {
        items: entity.items,
        total: entity.total(),
      },
      {
        where: {
          id: entity.id
        },
      },
    )
  }

  async find(id: string): Promise<Order> {
    const orderModel = await OrderModel.findOne({
      where: { id: id },
      include: [OrderItemModel], 
    });

    if (orderModel == null) {
      throw new Error("Order not found");
    }

    return new Order(orderModel.id, orderModel.customer_id, this.itemsMap(orderModel.items));
  }
  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll();
    return orderModels.map(orderModel => new Order(
        orderModel.id, 
        orderModel.customer_id, 
        this.itemsMap(orderModel.items)
      )
    );
  }
  private itemsMap(itemsModel: OrderItemModel[]): OrderItem[] {
    return itemsModel.map(itemModel => new OrderItem(
        itemModel.id, 
        itemModel.name, 
        itemModel.price, 
        itemModel.product_id, 
        itemModel.quantity
      )
    )
  }
}
