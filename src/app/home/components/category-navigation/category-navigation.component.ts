import { Component, EventEmitter, Output } from '@angular/core';
import { CategoriesStoreItem } from '../../services/category/categories.storeItem';
import { Category } from '../../types/category.type';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { NavigationEnd, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-category-navigation',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './category-navigation.component.html',
  styleUrl: './category-navigation.component.scss',
})
export class CategoryNavigationComponent {
  @Output() categoryClicked: EventEmitter<number> = new EventEmitter<number>();
  displayOptions = true;

  constructor(
    public categoryStore: CategoriesStoreItem,
    private router: Router,
  ) {
    router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event) => {
      this.displayOptions = (event as NavigationEnd).url === '/home/products';
    });
  }

  onCategoryClicked(category: Category): void {
    this.categoryClicked.emit(category.id);
  }
}
