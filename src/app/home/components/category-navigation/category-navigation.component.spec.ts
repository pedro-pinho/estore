import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryNavigationComponent } from './category-navigation.component';
import { CategoriesStoreItem } from '../../services/category/categories.storeItem';
import { CategoriesStoreItemMock } from '../../../shared/mocks/categories.storeItem.mock';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { Router, provideRouter } from '@angular/router';
import { routes } from '../../../app.routes';
import { By } from '@angular/platform-browser';

describe('CategoryNavigationComponent', () => {
  let component: CategoryNavigationComponent;
  let fixture: ComponentFixture<CategoryNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryNavigationComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter(routes),
        {
          provide: CategoriesStoreItem,
          useClass: CategoriesStoreItemMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display only category Home if displayOptions is false', () => {
    component.displayOptions = false;
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(1);
    expect(
      fixture.debugElement.queryAll(By.css('li'))[0].nativeElement.textContent
    ).toContain('Home');
  });

  it('should display all categories if displayOptions is true', () => {
    component.displayOptions = true;
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);
    expect(
      fixture.debugElement.queryAll(By.css('li'))[0].nativeElement.textContent
    ).toContain('Home');
    expect(
      fixture.debugElement.queryAll(By.css('li'))[1].nativeElement.textContent
    ).toContain('Category 1');
    expect(
      fixture.debugElement.queryAll(By.css('li'))[2].nativeElement.textContent
    ).toContain('Category 2');
  });

  it('should have route to products page on Home anchor', () => {
    const anchor = fixture.debugElement.query(By.css('li a'));
    expect(anchor.nativeElement.getAttribute('routerLink')).toBe('/home/products');
  });

  it('should emit categoryClicked event when a category is clicked', () => {
    const onCategoryClickSpy: jasmine.Spy = spyOn(component.categoryClicked, 'emit');
    component.displayOptions = true;
    fixture.detectChanges();

    const element = fixture.debugElement.queryAll(By.css('a'))[1].nativeElement;
    element.click();
    expect(onCategoryClickSpy).toHaveBeenCalled();
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
