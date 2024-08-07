import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartStoreItem } from '../cart/cart.storeItem';
import type { Order, OrderItem, OrderHistory, OrderHistoryProduct } from '../../types/order.type';
import type { DeliveryAddress } from '../../types/cart.type';
import { UserService } from '../users/user.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient, private cartStoreItem: CartStoreItem, private userService: UserService) {}

  saveOrder(deliveryAddress: DeliveryAddress, userEmail: string): Observable<any> {
    const url = 'http://localhost:5001/orders/add';
    const orderDetails: OrderItem[] = [];
    this.cartStoreItem.cart.products.forEach((item) => {
      const orderItem: OrderItem = {
        productId: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
        amount: item.amount,
      };
      orderDetails.push(orderItem);
    });
    const order: Order = {
      userName: deliveryAddress.userName,
      address: deliveryAddress.address,
      city: deliveryAddress.city,
      state: deliveryAddress.state,
      pin: deliveryAddress.pin,
      total: this.cartStoreItem.cart.totalAmount,
      userEmail,
      orderDetails,
    };
    return this.httpClient.post(url, order, {
      headers: {
        Authorization: this.userService.token,
      },
    });
  }

  getOrderHistory(userEmail: string): Observable<OrderHistory[]> {
    if (!userEmail || !this.userService.token) {
      return new Observable();
    }
    const url = 'http://localhost:5001/orders/list/' + userEmail;
    return this.httpClient.get<OrderHistory[]>(url, {
      headers: {
        Authorization: this.userService.token,
      }
    });
  }

  getOrderHistoryProducts(orderId: number): Observable<OrderHistoryProduct[]> {
    if (!this.userService.token) {
      return new Observable();
    }
    const url = 'http://localhost:5001/orders/details/' + orderId;
    return this.httpClient.get<OrderHistoryProduct[]>(url, {
      headers: {
        Authorization: this.userService.token,
      }
    });
  }
}
