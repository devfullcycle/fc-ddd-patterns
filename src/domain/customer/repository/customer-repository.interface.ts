import { RepositoryInterface } from "@/domain/@shared/repository";
import { Customer } from "@/domain/customer/entity";

export default interface CustomerRepositoryInterface
  extends RepositoryInterface<Customer> {}
