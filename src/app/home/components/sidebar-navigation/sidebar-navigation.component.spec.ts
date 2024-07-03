import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarNavigationComponent } from './sidebar-navigation.component';
import { CategoriesStoreItem } from '../../services/category/categories.storeItem';
import { CategoriesStoreItemMock } from '../../../shared/mocks/categories.storeItem.mock';

describe('SidebarNavigationComponent', () => {
  let component: SidebarNavigationComponent;
  let fixture: ComponentFixture<SidebarNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarNavigationComponent],
      providers: [{ provide: CategoriesStoreItem, useClass: CategoriesStoreItemMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize categories from the store', () => {
    expect(component.categories.length).toBe(6);
  });

  it('should filter categories based on parentCategoryId', () => {
    const parentCategoryId = 1;
    const filteredCategories = component.getCategories(parentCategoryId);
    expect(filteredCategories.length).toBe(2);
    expect(filteredCategories[0].id).toBe(2);
  });

  it('should emit subCategoryClicked event when onSubCategoryClicked is called', () => {
    spyOn(component.subCategoryClicked, 'emit');
    const subCategory = { id: 2, category: 'Category 2', parent_category_id: 1 };
    component.onSubCategoryClicked(subCategory);
    expect(component.subCategoryClicked.emit).toHaveBeenCalledWith(2);
  });

  it('should unsubscribe from categories observable on destroy', () => {
    spyOn(component.subscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.subscription.unsubscribe).toHaveBeenCalled();
  });
});
