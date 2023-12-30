import { v4 as uuid } from "uuid";
import { Product } from "@/domain/product/entity";
import { ProductInterface } from "@/domain/product/entity";
import { ProductB } from "@/domain/product/entity";

export default class ProductFactory {
  public static create(
    type: "a" | "b" | "c",
    name: string,
    price: number
  ): ProductInterface {
    switch (type) {
      case "a":
        return new Product(uuid(), name, price);
      case "b":
        return new ProductB(uuid(), name, price);
      default:
        throw new Error("Product type not supported");
    }
  }
}
