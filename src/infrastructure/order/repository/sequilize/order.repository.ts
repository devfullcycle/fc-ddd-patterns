import Order from "../../../../domain/checkout/entity/order";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";
import OrderItem from "../../../../domain/checkout/entity/order_item";

export default class OrderRepository {
    async create(entity: Order): Promise<void> {
        await OrderModel.create(
            {
                id: entity.id,
                customer_id: entity.customerId,
                status: entity.status,
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
                include: [{model: OrderItemModel}],
            }
        );
    }


    async update(entity: Order) {
        await OrderModel.update(
            {
                id: entity.id,
                customer_id: entity.customerId,
                status: entity.status,
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
                where: {id: entity.id},
                include: [{model: OrderItemModel}],
            }
        );
    }

    async find(id: string): Promise<Order> {
        const orderModel = await OrderModel.findOne({where: {id}, include: [{model: OrderItemModel}]});

        const order = new Order(orderModel.id, orderModel.customer_id, orderModel.items
            .map((item) => new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity)));

        order.changeStatus(orderModel.status);

        return order;
    }

    async findAll() : Promise<Order[]> {
        const orderModels = await OrderModel.findAll({include: [{model: OrderItemModel}]});

        const orders = orderModels
            .map((orderModel) => new Order(orderModel.id, orderModel.customer_id, orderModel.items.map((item) => new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity))));

        orders.forEach((order) => order.changeStatus(order.status));

        return orders;
    }
}
