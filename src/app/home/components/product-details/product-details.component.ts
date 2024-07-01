import { Component, OnInit, OnDestroy } from '@angular/core';
import { RatingsComponent } from '../../../shared/components/ratings/ratings.component';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/product/products.service';
import { Product } from '../../types/product.type';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartStoreItem } from '../../services/cart/cart.storeItem';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [RatingsComponent, CommonModule, FontAwesomeModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product?: Product;
  subscriptions: Subscription = new Subscription();
  faShoppingCart = faShoppingCart;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private cart: CartStoreItem,
  ) {}

  ngOnInit(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.subscriptions.add(
      this.productsService.getProduct(id).subscribe((product: Product) => {
        this.product = product;
      }),
    );
  }

  addToCart(): void {
    if (!this.product) {
      return;
    }
    this.cart.addProduct(this.product);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
