/* eslint-disable @typescript-eslint/no-empty-function */
import { Observable, of } from "rxjs";
import type { Category } from "../../home/types/category.type";
export class CategoriesStoreItemMock {
  loadCategories(): Promise<void> {
    return Promise.resolve();
  }
  categories$: Observable<Category[]> = of([
    { id: 1, category: 'Category 1' },
    { id: 2, category: 'Category 2' },
  ]);
  topLevelCategories$: Observable<Category[]> = of([
    { id: 1, category: 'Category 1' },
    { id: 2, category: 'Category 2' },
  ]);
}
