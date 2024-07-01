import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { OrderHistory, OrderHistoryProduct } from '../../types/order.type';
import { Subscription } from 'rxjs';
import { OrderService } from '../../services/order/order.service';
import { UserService } from '../../services/users/user.service';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.scss'
})
export class OrderHistoryComponent implements OnInit, OnDestroy {
  pastOrderProducts: OrderHistoryProduct[] = [];
  pastOrder: OrderHistory;
  pastOrders: OrderHistory[] = [];
  subscriptions: Subscription = new Subscription();
  constructor(
    private orderService: OrderService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.orderService
        .getOrderHistory(this.userService.loggedInUser.email)
        .subscribe((pastOrders) => {
          this.pastOrders = pastOrders;
          console.log('this.pastOrders', this.pastOrders);

        })
    );
  }

  selectOrder(event: any) {
    if (Number.parseInt(event.target.value) > 0) {
      console.log('this.pastOrders', this.pastOrders);
      console.log('event.target.value', event.target.value);


      this.pastOrder = this.pastOrders.filter(
        (order) => order.id === Number.parseInt(event.target.value)
      )[0];
      this.getOrderProducts(this.pastOrder.id);
    } else {
      this.pastOrder = undefined as any;
      this.pastOrderProducts = [];
    }
  }

  getOrderProducts(orderId: number): void {
    this.subscriptions.add(
      this.orderService.getOrderHistoryProducts(orderId).subscribe(products => {
        this.pastOrderProducts = products
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
