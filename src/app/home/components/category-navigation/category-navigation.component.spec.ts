import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryNavigationComponent } from './category-navigation.component';
import { CategoriesStoreItem } from '../../services/category/categories.storeItem';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { Router, provideRouter } from '@angular/router';
import { routes } from '../../../app.routes';
import { Category } from '../../types/category.type';

describe('CategoryNavigationComponent', () => {
  let component: CategoryNavigationComponent;
  let fixture: ComponentFixture<CategoryNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryNavigationComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter(routes), CategoriesStoreItem],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit categoryClicked event when a category is clicked', () => {
    spyOn(component.categoryClicked, 'emit');
    const category: Category = { id: 1, category: 'Category 1' };
    component.onCategoryClicked(category);
    expect(component.categoryClicked.emit).toHaveBeenCalledWith(1);
  });

  it('should set displayOptions to true when NavigationEnd event is /home/products', async () => {
    const router = TestBed.inject(Router);
    router.navigate(['/home/products']);
    await fixture.whenStable();
    expect(component.displayOptions).toBeTrue();
  });

  it('should set displayOptions to false when NavigationEnd event is not /home/products', async () => {
    const router = TestBed.inject(Router);
    router.navigate(['/home/login']);
    await fixture.whenStable();
    expect(component.displayOptions).toBeFalse();
  });
});
