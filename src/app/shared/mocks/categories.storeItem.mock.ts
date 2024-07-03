/* eslint-disable @typescript-eslint/no-empty-function */
import { Observable, of } from "rxjs";
import type { Category } from "../../home/types/category.type";
export class CategoriesStoreItemMock {
  loadCategories(): Promise<void> {
    return Promise.resolve();
  }
  categories$: Observable<Category[]> = of([
    { id: 1, category: 'Category 1' },
    { id: 2, category: 'Category 2', parent_category_id: 1 },
    { id: 3, category: 'Category 3', parent_category_id: 1 },
    { id: 4, category: 'Category 4', parent_category_id: 2 },
    { id: 5, category: 'Category 5', parent_category_id: 2 },
    { id: 6, category: 'Category 6' },
  ]);
  topLevelCategories$: Observable<Category[]> = of([
    { id: 1, category: 'Category 1' },
    { id: 6, category: 'Category 6' },
  ]);
}
