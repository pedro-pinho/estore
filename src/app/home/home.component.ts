import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { CategoryNavigationComponent } from './components/category-navigation/category-navigation.component';
import { CategoriesStoreItem } from './services/category/categories.storeItem';
import { ProductsStoreItem } from './services/product/products.storeItem';
import type { SearchKeyword } from './types/searchKeyword.type';
import { ProductsGalleryComponent } from './components/products-gallery/products-gallery.component';
import { RouterOutlet } from '@angular/router';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    CategoryNavigationComponent,
    ProductsGalleryComponent,
    RouterOutlet,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [CategoriesStoreItem, ProductsStoreItem],
})
export class HomeComponent {
  constructor(
    private categoriesStoreItem: CategoriesStoreItem,
    private productsStoreItem: ProductsStoreItem,
    private router: Router,
  ) {
    this.categoriesStoreItem.loadCategories();
    this.productsStoreItem.loadProducts();
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        if ((event as NavigationEnd).url === '/home') {
          router.navigate(['/home/products']);
        }
      });
  }

  onSelectCategory(categoryId: number): void {
    this.productsStoreItem.loadProducts('maincategoryid=' + categoryId);
  }

  onSearchKeyword(searchKeyword: SearchKeyword): void {
    this.productsStoreItem.loadProducts(
      'maincategoryid=' +
        searchKeyword.categoryId +
        '&keyword=' +
        searchKeyword.keyword,
    );
  }
}
