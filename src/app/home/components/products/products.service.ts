import { Injectable } from '@angular/core';
import { Product } from './product.type';
import { products } from '../../sampleData/products.data';

@Injectable()
export class ProductsService {

  constructor() { }

  getProducts(): Product[] {
    return products;
  }
}
