import { Component } from '@angular/core';
import { Category } from '../../types/category.type';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-sidebar-navigation',
  standalone: true,
  imports: [],
  templateUrl: './sidebar-navigation.component.html',
  styleUrl: './sidebar-navigation.component.scss'
})
export class SidebarNavigationComponent {
  categories: Category[] = [];

  constructor(categoryService: CategoryService) {
    categoryService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  getCategories(parentCategoryId?: number): Category[] {
    return this.categories.filter(category => parentCategoryId ? category.parent_category_id === parentCategoryId : !category.parent_category_id);
  }

}
