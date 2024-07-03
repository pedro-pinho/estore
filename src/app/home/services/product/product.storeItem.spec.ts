import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ProductsService } from './products.service';
import { Product } from '../../types/product.type';
import { ProductsStoreItem } from './products.storeItem';

describe('ProductsStoreItem', () => {
  let productsStoreItem: ProductsStoreItem;
  let productsService: jasmine.SpyObj<ProductsService>;

  beforeEach(() => {
    const productsServiceSpy = jasmine.createSpyObj('ProductsService', ['getAllProducts']);

    TestBed.configureTestingModule({
      providers: [
        ProductsStoreItem,
        { provide: ProductsService, useValue: productsServiceSpy }
      ]
    });

    productsStoreItem = TestBed.inject(ProductsStoreItem);
    productsService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
  });

  it('should be created', () => {
    expect(productsStoreItem).toBeTruthy();
  });

  it('should load products', (done: DoneFn) => {
    const mockProducts: Product[] = [
      { id: 1, name: 'Product 1', image: 'image1', price: 100, rating: 4, category_id: 1 },
      { id: 2, name: 'Product 2', image: 'image2', price: 200, rating: 3, category_id: 2 }
    ];

    productsService.getAllProducts.and.returnValue(of(mockProducts));

    productsStoreItem.loadProducts().then(() => {
      productsStoreItem.products$.subscribe(products => {
        expect(products).toEqual(mockProducts);
        done();
      });
    });
  });

  it('should return products$ as an observable', (done: DoneFn) => {
    productsStoreItem.products$.subscribe(products => {
      expect(products).toEqual([]);
      done();
    });
  });

  it('should return products', async () => {
    const mockProducts: Product[] = [
      { id: 1, name: 'Product 1', image: 'image1', price: 100, rating: 4, category_id: 1 },
      { id: 2, name: 'Product 2', image: 'image2', price: 200, rating: 3, category_id: 2 }
    ];

    productsService.getAllProducts.and.returnValue(of(mockProducts));

    productsStoreItem.loadProducts().then(() => {
      expect(productsStoreItem.products).toEqual(mockProducts);
    });
  });
});
