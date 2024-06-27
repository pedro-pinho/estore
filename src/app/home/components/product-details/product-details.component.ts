import { Component, OnInit, OnDestroy } from '@angular/core';
import { RatingsComponent } from '../../../shared/components/ratings/ratings.component';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/product/products.service';
import { Product } from '../../types/product.type';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [RatingsComponent, CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product?: Product;
  subscriptions: Subscription = new Subscription();
  constructor(private activatedRoute: ActivatedRoute, private productsService: ProductsService) {}

  ngOnInit(): void {
    const id: number = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.subscriptions.add(
      this.productsService.getProduct(id).subscribe((product: Product) => {
        this.product = product;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
