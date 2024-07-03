import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsComponent } from './product-details.component';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/product/products.service';
import { CartStoreItem } from '../../services/cart/cart.storeItem';
import { CartStoreItemMock } from '../../../shared/mocks/cart.storeItem.mock';
import { ProductServiceMock } from '../../../shared/mocks/product.service.mock';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;
  let productService: ProductsService;
  let cartStoreItem: CartStoreItem;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetailsComponent],
      providers: [{
        provide: ActivatedRoute, useValue: {
          snapshot: {
            paramMap: {
              get: () => '1'
            }
          }
        }
      }, {
        provide: ProductsService, useClass: ProductServiceMock
      }, {
        provide: CartStoreItem, useClass: CartStoreItemMock
      }]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductsService);
    cartStoreItem = TestBed.inject(CartStoreItem);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getProduct on initialization', () => {
    const getProductSpy = spyOn(productService, 'getProduct').and.callThrough();
    component.ngOnInit();
    expect(getProductSpy).toHaveBeenCalledWith(1);
  });

  it('should add product to cart', () => {
    const addProductSpy = spyOn(cartStoreItem, 'addProduct');
    component.addToCart();
    expect(addProductSpy).toHaveBeenCalled();
  });

  it('should not add product to cart if product is undefined', () => {
    const addProductSpy = spyOn(cartStoreItem, 'addProduct');
    component.product = undefined;
    component.addToCart();
    expect(addProductSpy).not.toHaveBeenCalled();
  });

  it('should unsubscribe on destroy', () => {
    const unsubscribeSpy = spyOn(component.subscriptions, 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
