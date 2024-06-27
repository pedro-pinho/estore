import { Component, EventEmitter, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faUserCircle, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CategoriesStoreItem } from '../../services/category/categories.storeItem';
import { CommonModule } from '@angular/common';
import { SearchKeyword } from '../../types/searchKeyword.type';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  faSearch = faSearch;
  faUserCircle = faUserCircle;
  faShoppingCart = faShoppingCart;

  @Output()
  searchClicked: EventEmitter<SearchKeyword> = new EventEmitter<SearchKeyword>();

  displaySearch: boolean = true;

  constructor(public categoryStore: CategoriesStoreItem, private router: Router) {
    router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event) => {
      this.displaySearch = (event as NavigationEnd).url === '/home/products';
    });
  }

  onClickSearch(keyword: string, categoryId: string) {
    this.searchClicked.emit({ keyword, categoryId: parseInt(categoryId) });
  }
}
