/* eslint-disable @typescript-eslint/no-empty-function */
import { Observable, of } from "rxjs";
import type { Category } from "../../home/types/category.type";
export class CategoriesStoreItemMock {
  loadCategories(): any { };
  categories$: any;
  topLevelCategories$: Observable<Category[]> = of([
    { id: 1, category: 'Category 1' },
    { id: 2, category: 'Category 2' },
  ]);
}
