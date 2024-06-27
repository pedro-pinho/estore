import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { CategoryNavigationComponent } from './components/category-navigation/category-navigation.component';
import { CategoriesStoreItem } from './services/category/categories.storeItem';
import { ProductsStoreItem } from './services/product/products.storeItem';
import { SearchKeyword } from './types/searchKeyword.type';
import { ProductsGalleryComponent } from './components/products-gallery/products-gallery.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    CategoryNavigationComponent,
    ProductsGalleryComponent,
    RouterOutlet
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [CategoriesStoreItem, ProductsStoreItem],
})
export class HomeComponent {
  constructor(
    private categoriesStoreItem: CategoriesStoreItem,
    private productsStoreItem: ProductsStoreItem
  ) {
    this.categoriesStoreItem.loadCategories();
    this.productsStoreItem.loadProducts();
  }

  onSelectCategory(categoryId: number): void {
    this.productsStoreItem.loadProducts('maincategoryid=' + categoryId);
  }

  onSearchKeyword(searchKeyword: SearchKeyword): void {
    this.productsStoreItem.loadProducts(
      'maincategoryid=' + searchKeyword.categoryId + '&keyword=' + searchKeyword.keyword
    );
  }
}
