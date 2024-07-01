import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartStoreItem } from '../../services/cart/cart.storeItem';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import type { CartItem } from '../../types/cart.type';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RatingsComponent } from '../../../shared/components/ratings/ratings.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/users/user.service';
import type { loggedInUser } from '../../types/user.type';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RatingsComponent, FontAwesomeModule, FormsModule, ReactiveFormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit, OnDestroy {
  faTrash = faTrash;
  orderForm: FormGroup;
  user: loggedInUser;
  subscriptions: Subscription = new Subscription();

  constructor(
    public cartStore: CartStoreItem,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.user = {
      first_name: '',
      last_name: '',
      address: '',
      city: '',
      state: '',
      pin: '',
      email: '',
    };
    this.subscriptions.add(
      userService.loggedInUser$.subscribe((user) => {
        if (!user || !user.first_name) {
          return;
        }
        this.user = user;
      })
    );
  }

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      name: [this.user.first_name + ' ' + this.user.last_name, Validators.required],
      address: [this.user.address, Validators.required],
      city: [this.user.city, Validators.required],
      state: [this.user.state, Validators.required],
      pin: [this.user.pin, Validators.required],
    });
  }

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

  onSubmit(): void {
    //
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
