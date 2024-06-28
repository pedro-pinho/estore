import { Component } from '@angular/core';
import { CartStoreItem } from '../../services/cart/cart.storeItem';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import type { CartItem } from '../../types/cart.type';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RatingsComponent } from '../../../shared/components/ratings/ratings.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RatingsComponent, FontAwesomeModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  faTrash = faTrash;
  constructor(public cartStore: CartStoreItem, private router: Router) {}

  navigateToHome(): void {
    this.router.navigate(['/home/products']);
  }

  updateQuantity($event: any, item: CartItem): void {
    if ($event.target.innerText === '+') {
      this.cartStore.addProduct(item.product);
    } else if ($event.target.innerText === '-') {
      this.cartStore.decreaseProductQuantity(item);
    }
  }

  removeItem(item: CartItem): void {
    this.cartStore.removeProduct(item);
  }
}
