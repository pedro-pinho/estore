import { Observable, of } from "rxjs";
import { Product } from "../../home/types/product.type";

export class ProductStoreItemMock {
  loadProducts: Observable<Product[]> = of([
    { id: 1, name: 'Product 1' },
    { id: 2, name: 'Product 2' },
  ] as Product[]);
  products$: any;
  products: any[] = [];
}
