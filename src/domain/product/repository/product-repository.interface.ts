import { RepositoryInterface } from "../../@shared/repository";
import { Product } from "../entity";

export default interface ProductRepositoryInterface
  extends RepositoryInterface<Product> {}
