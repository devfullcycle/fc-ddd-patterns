import Customer from "../entity/customer";
import RepositoryInterface from "./repository-interface";

export default interface CustomerRepositoryInterface
  extends RepositoryInterface<Customer> {}
