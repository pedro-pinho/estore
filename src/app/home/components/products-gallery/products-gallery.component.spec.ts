import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsGalleryComponent } from './products-gallery.component';
import { ProductsStoreItem } from '../../services/product/products.storeItem';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ProductStoreItemMock } from '../../../shared/mocks/product.storeItem.mock';
import { CategoriesStoreItem } from '../../services/category/categories.storeItem';
import { CategoriesStoreItemMock } from '../../../shared/mocks/categories.storeItem.mock';

describe('ProductsGalleryComponent', () => {
  let component: ProductsGalleryComponent;
  let fixture: ComponentFixture<ProductsGalleryComponent>;
  let productsStoreItem: ProductsStoreItem;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsGalleryComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(),{
        provide: ProductsStoreItem, useClass: ProductStoreItemMock
      }, {
        provide: CategoriesStoreItem, useClass: CategoriesStoreItemMock
      }],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsGalleryComponent);
    component = fixture.componentInstance;
    productsStoreItem = TestBed.inject(ProductsStoreItem);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadProducts when onSelectSubCategory is called', () => {
    const loadProductsSpy = spyOn(productsStoreItem, 'loadProducts');
    component.onSelectSubCategory(1);
    expect(loadProductsSpy).toHaveBeenCalledWith('subcategoryid=1');
  });
});
