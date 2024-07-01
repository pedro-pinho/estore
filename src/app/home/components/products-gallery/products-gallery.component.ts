import { Component } from '@angular/core';
import { SidebarNavigationComponent } from '../sidebar-navigation/sidebar-navigation.component';
import { ProductsComponent } from '../products/products.component';
import { ProductsStoreItem } from '../../services/product/products.storeItem';

@Component({
  selector: 'app-products-gallery',
  standalone: true,
  imports: [SidebarNavigationComponent, ProductsComponent],
  templateUrl: './products-gallery.component.html',
  styleUrl: './products-gallery.component.scss',
})
export class ProductsGalleryComponent {
  constructor(private productsStoreItem: ProductsStoreItem) {}

  onSelectSubCategory(subCategoryId: number): void {
    this.productsStoreItem.loadProducts('subcategoryid=' + subCategoryId);
  }
}
