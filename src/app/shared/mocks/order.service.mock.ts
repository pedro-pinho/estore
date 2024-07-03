import { Observable, of } from 'rxjs';
import { OrderHistory, OrderHistoryProduct } from '../../home/types/order.type';

export class OrderServiceMock {
  saveOrder(a: any, b: any): Observable<any> {
    return of({a, b});
  }
  getOrderHistory(): Observable<OrderHistory[]> {
    return of([
      {
        id: 1,
        order_date: '07/01/2024',
        user_name: 'John Doe',
        address: '241 Georgia Ave',
        city: 'Paramount',
        state: 'CA',
        pin: '90723',
        total: 230,
      },
    ] as OrderHistory[]);
  }
  getOrderHistoryProducts(): Observable<OrderHistoryProduct[]> {
    return of([
      {
        productId: 1,
        name: 'Product 1',
        image: 'product1.jpg',
        quantity: 2,
        price: 100,
        amount: 200,
      },
      {
        productId: 2,
        name: 'Product 2',
        image: 'product2.jpg',
        quantity: 1,
        price: 30,
        amount: 30,
      }
    ] as OrderHistoryProduct[]);
  }
}
