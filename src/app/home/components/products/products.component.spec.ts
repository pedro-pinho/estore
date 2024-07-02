import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { ProductsStoreItem } from '../../services/product/products.storeItem';
import { CartStoreItem } from '../../services/cart/cart.storeItem';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ProductStoreItemMock } from '../../../shared/mocks/product.storeItem.mock';
import { CartStoreItemMock } from '../../../shared/mocks/cart.storeItem.mock';
import { Product } from '../../types/product.type';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let cartStoreItem: CartStoreItem;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: ProductsStoreItem,
          useClass: ProductStoreItemMock,
        },
        {
          provide: CartStoreItem,
          useClass: CartStoreItemMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    cartStoreItem = TestBed.inject(CartStoreItem);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('addToCart', () => {
    it('should call addProduct function in the CartStoreItem', () => {
      const spyAddProduct: jasmine.Spy = spyOn(cartStoreItem, 'addProduct');
      const product: Product = {
        id: 1,
        name: 'Product 1',
        price: 100,
        rating: 4,
        description: 'Description 1',
        image: 'image-1',
        category_id: 1,
      };
      component.addToCart(product);
      expect(spyAddProduct).toHaveBeenCalledWith(product);
    });
  });
});
