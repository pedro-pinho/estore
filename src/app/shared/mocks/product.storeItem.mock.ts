/* eslint-disable @typescript-eslint/no-unused-vars */
import { Observable, of } from "rxjs";
import { Product } from "../../home/types/product.type";

export class ProductStoreItemMock {
  loadProducts(params?: string): Observable<Product[]> {
    return of([
      {
        id: 1,
        name: "Product 1",
        image: "product1.jpg",
        price: 100,
        rating: 4,
        category_id: 1,
      },
      {
        id: 2,
        name: "Product 2",
        image: "product2.jpg",
        price: 200,
        rating: 3,
        category_id: 1,
      },
      {
        id: 3,
        name: "Product 3",
        image: "product3.jpg",
        price: 300,
        rating: 5,
        category_id: 2,
      },
    ]);
  }
  products$: Observable<Product[]> = of([]);
  products: Product[] = [];
}
