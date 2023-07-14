import { TransactionInterface } from "../../@shared/domain/transaction.interface";
import RepositoryInterface from "../../@shared/repository/repository-interface";
import Customer from "../entity/customer";

export default interface CustomerRepositoryInterface
  extends RepositoryInterface<Customer> {}
