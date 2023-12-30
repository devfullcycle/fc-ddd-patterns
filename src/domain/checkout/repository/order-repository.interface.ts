import { RepositoryInterface } from "@/domain/@shared/repository";
import { Order } from "@/domain/checkout/entity";

export default interface OrderRepositoryInterface
  extends RepositoryInterface<Order> {}
