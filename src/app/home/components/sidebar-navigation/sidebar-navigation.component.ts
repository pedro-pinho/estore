import { Component, EventEmitter, Output } from '@angular/core';
import { Category } from '../../types/category.type';
import { OnDestroy } from '@angular/core';
import { CategoriesStoreItem } from '../../services/category/categories.storeItem';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar-navigation',
  standalone: true,
  imports: [],
  templateUrl: './sidebar-navigation.component.html',
  styleUrl: './sidebar-navigation.component.scss',
})
export class SidebarNavigationComponent implements OnDestroy {
  @Output() subCategoryClicked: EventEmitter<number> = new EventEmitter<number>();
  categories: Category[] = [];
  subscription: Subscription = new Subscription();

  constructor(categoryStore: CategoriesStoreItem) {
    this.subscription.add(
      categoryStore.categories$.subscribe((categories) => {
        this.categories = categories;
      }),
    );
  }

  getCategories(parentCategoryId?: number): Category[] {
    return this.categories.filter((category) =>
      parentCategoryId
        ? category.parent_category_id === parentCategoryId
        : !category.parent_category_id,
    );
  }

  onSubCategoryClicked(subCategory: Category): void {
    this.subCategoryClicked.emit(subCategory.id);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
