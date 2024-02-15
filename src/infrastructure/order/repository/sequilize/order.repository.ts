import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

function orderItemModelToOrderItem(orderItemModel: OrderItemModel) {
	return new OrderItem(orderItemModel.id, orderItemModel.name, orderItemModel.price, orderItemModel.product_id, orderItemModel.quantity);
}

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
  
  async update(entity: Order): Promise<void> {
    const sequelize = OrderModel.sequelize
    await sequelize.transaction(async (t) => {
      await OrderItemModel.destroy({
        where: { order_id: entity.id },
        transaction: t,
      })
      const items = entity.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity,
        order_id: entity.id,
      }))
      await OrderItemModel.bulkCreate(items, { transaction: t })
      await OrderModel.update(
        { customer_id: entity.customerId, total: entity.total() },
        { where: { id: entity.id }, transaction: t }
      )
    })
  }

  async find(id: string): Promise<Order> {
		let orderOnDB;

		try {
			orderOnDB = await OrderModel.findOne({
				where: { id },
				include: [{ model: OrderItemModel }],
				rejectOnEmpty: true,
			});
		} catch (error) {
			throw new Error(`Order with id: ${id} not found`);
		}

		const items = orderOnDB.items.map(orderItemModelToOrderItem);
		const order = new Order(orderOnDB.id, orderOnDB.customer_id, items);

		return order;
	}

  async findAll(): Promise<Order[]> {
		const ordersOnDB = await OrderModel.findAll({ include: [{ model: OrderItemModel }] });

		const orders = ordersOnDB.map((orderOnDB) => {
			const items = orderOnDB.items.map(orderItemModelToOrderItem);
			const order = new Order(orderOnDB.id, orderOnDB.customer_id, items);

			return order;
		});

		return orders;
	}
}
