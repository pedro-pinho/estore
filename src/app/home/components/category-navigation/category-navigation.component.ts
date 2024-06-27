import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { CategoriesStoreItem } from '../../services/category/categories.storeItem';
import { Category } from '../../types/category.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-navigation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-navigation.component.html',
  styleUrl: './category-navigation.component.scss',
})
export class CategoryNavigationComponent {
  @Output() categoryClicked: EventEmitter<number> = new EventEmitter<number>();

  constructor(public categoryStore: CategoriesStoreItem) { }

  onCategoryClicked(category: Category): void {
    this.categoryClicked.emit(category.id);
  }
}
