import { Injectable } from '@angular/core';
import { StoreItem } from '../../../shared/storeItem';
import type { Cart, CartItem } from '../../types/cart.type';
import type { Product } from '../../types/product.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartStoreItem extends StoreItem<Cart> {
  constructor() {
    const storedCart: any =
      typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('cart') : null;
    if (storedCart) {
      super(JSON.parse(storedCart));
    } else {
      super({ products: [], totalAmount: 0, totalProducts: 0 });
    }
  }

  get cart$(): Observable<Cart> {
    return this.value$;
  }

  get cart(): Cart {
    return this.value;
  }

  addProduct(product: Product): void {
    const cartProduct: CartItem | undefined = this.cart.products.find(
      (item: CartItem) => item.product.id === product.id,
    );
    if (!cartProduct) {
      this.cart.products = [
        ...this.cart.products,
        {
          product,
          quantity: 1,
          amount: Number(product.price),
        },
      ];
    } else {
      cartProduct.quantity++;
      cartProduct.amount = Number(cartProduct.amount) + Number(product.price);
    }
    this.cart.totalAmount += Number(product.price);
    ++this.cart.totalProducts;
    this.saveCart();
  }

  removeProduct(cartItem: CartItem): void {
    this.cart.products = this.cart.products.filter(
      (item: CartItem) => item.product.id !== cartItem.product.id,
    );
    this.cart.totalProducts -= cartItem.quantity;
    this.cart.totalAmount -= cartItem.amount;
    if (this.cart.totalProducts === 0) {
      sessionStorage.clear();
    } else {
      this.saveCart();
    }
  }

  decreaseProductQuantity(cartItem: CartItem): void {
    const cartProduct: CartItem | undefined = this.cart.products.find(
      (cartProduct: CartItem) => cartProduct.product.id === cartItem.product.id,
    );
    if (cartProduct) {
      if (cartProduct.quantity === 1) {
        this.removeProduct(cartProduct);
      } else {
        cartProduct.quantity--;
        this.cart.totalAmount -= Number(cartItem.product.price);
        --this.cart.totalProducts;
      }
      this.saveCart();
    }
  }

  saveCart(): void {
    sessionStorage.clear();
    sessionStorage.setItem('cart', JSON.stringify(this.cart));
  }

  clearCart(): void {
    sessionStorage.clear();
    this.cart.products = [];
    this.cart.totalAmount = 0;
    this.cart.totalProducts = 0;
  }
}
