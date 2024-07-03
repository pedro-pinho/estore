import { Observable, of } from 'rxjs';
import { Product } from '../../home/types/product.type';

export class ProductServiceMock {
  private products: Product[] = [
    { id: 1, name: 'Product 1', image: 'product1.jpg', price: 100, rating: 4, category_id: 1 },
    { id: 2, name: 'Product 2', image: 'product2.jpg', price: 200, rating: 3, category_id: 2 },
  ];

  getAllProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProduct(id: number): Observable<Product> {
    const product = this.products.find(p => p.id === id);
    return of(product as Product);
  }
}
