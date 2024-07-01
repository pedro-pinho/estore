import { StoreItem } from '../../../shared/storeItem';
import type { Product } from '../../types/product.type';
import { ProductsService } from './products.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsStoreItem extends StoreItem<Product[]> {
  constructor(private productsService: ProductsService) {
    super([]);
  }

  async loadProducts(query?: string) {
    this.productsService.getAllProducts(query).subscribe((products: Product[]) => {
      this.setValue(products);
    });
  }

  get products$(): Observable<Product[]> {
    return this.value$;
  }

  get products(): Product[] {
    return this.value;
  }
}
