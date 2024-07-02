import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsGalleryComponent } from './products-gallery.component';
import { ProductsStoreItem } from '../../services/product/products.storeItem';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CategoriesStoreItem } from '../../services/category/categories.storeItem';

describe('ProductsGalleryComponent', () => {
  let component: ProductsGalleryComponent;
  let fixture: ComponentFixture<ProductsGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsGalleryComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(),ProductsStoreItem, CategoriesStoreItem],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
