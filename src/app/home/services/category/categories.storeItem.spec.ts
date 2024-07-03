import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CategoryService } from './category.service';
import { Category } from '../../types/category.type';
import { CategoriesStoreItem } from './categories.storeItem';

describe('CategoriesStoreItem', () => {
  let categoriesStoreItem: CategoriesStoreItem;
  let categoryService: jasmine.SpyObj<CategoryService>;

  beforeEach(() => {
    const categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['getAllCategories']);

    TestBed.configureTestingModule({
      providers: [
        CategoriesStoreItem,
        { provide: CategoryService, useValue: categoryServiceSpy }
      ]
    });

    categoriesStoreItem = TestBed.inject(CategoriesStoreItem);
    categoryService = TestBed.inject(CategoryService) as jasmine.SpyObj<CategoryService>;
  });

  it('should be created', () => {
    expect(categoriesStoreItem).toBeTruthy();
  });

  it('should load categories', (done: DoneFn) => {
    const mockCategories: Category[] = [
      { id: 1, category: 'Category 1' },
      { id: 2, category: 'Category 2', parent_category_id: 1 }
    ];

    categoryService.getAllCategories.and.returnValue(of(mockCategories));

    categoriesStoreItem.loadCategories().then(() => {
      categoriesStoreItem.categories$.subscribe(categories => {
        expect(categories).toEqual(mockCategories);
        done();
      });
    });
  });

  it('should return categories$ as an observable', (done: DoneFn) => {
    categoriesStoreItem.categories$.subscribe(categories => {
      expect(categories).toEqual([]);
      done();
    });
  });

  it('should return topLevelCategories$', (done: DoneFn) => {
    const mockCategories: Category[] = [
      { id: 1, category: 'Category 1' },
      { id: 2, category: 'Category 2', parent_category_id: 1 }
    ];

    categoryService.getAllCategories.and.returnValue(of(mockCategories));

    categoriesStoreItem.loadCategories().then(() => {
      categoriesStoreItem.topLevelCategories$.subscribe(topLevelCategories => {
        const expectedTopLevelCategories = mockCategories.filter(category => category.parent_category_id === null);
        expect(topLevelCategories).toEqual(expectedTopLevelCategories);
        done();
      });
    });
  });
});
