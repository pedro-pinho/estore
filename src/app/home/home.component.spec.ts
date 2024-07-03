import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { HeaderComponent } from './components/header/header.component';
import { CategoryNavigationComponent } from './components/category-navigation/category-navigation.component';
import { ProductsGalleryComponent } from './components/products-gallery/products-gallery.component';
import { Router, NavigationEnd, RouterOutlet, ActivatedRoute } from '@angular/router';
import { CategoriesStoreItem } from './services/category/categories.storeItem';
import { ProductsStoreItem } from './services/product/products.storeItem';
import { of } from 'rxjs';
import { CategoriesStoreItemMock } from '../shared/mocks/categories.storeItem.mock';
import { ProductStoreItemMock } from '../shared/mocks/product.storeItem.mock';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router;
  let loadCategoriesSpy: jasmine.Spy;
  let loadProductsSpy: jasmine.Spy;

  beforeEach(async () => {
    const routerMock = {
      events: of(new NavigationEnd(0, '/home', '/home')),
      navigate: jasmine.createSpy('navigate'),
      createUrlTree: jasmine.createSpy('createUrlTree'),
      serializeUrl: jasmine.createSpy('serializeUrl'),
    };
    loadCategoriesSpy = spyOn(CategoriesStoreItem.prototype, 'loadCategories');
    loadProductsSpy = spyOn(ProductsStoreItem.prototype, 'loadProducts');

    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        HeaderComponent,
        CategoryNavigationComponent,
        ProductsGalleryComponent,
        RouterOutlet
      ],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: CategoriesStoreItem, useClass: CategoriesStoreItemMock },
        { provide: ProductsStoreItem, useValue: ProductStoreItemMock },
        {
          provide: ActivatedRoute, useValue: {
            snapshot: {
              paramMap: {
                get: () => '1'
              }
            }
          }
        },
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load categories on initialization', () => {
    expect(loadCategoriesSpy).toHaveBeenCalled();
  });

  it('should load products on initialization', () => {
    expect(loadProductsSpy).toHaveBeenCalled();
  });

  it('should navigate to /home/products if the URL is /home', async () => {
    router.navigate(['/home']);
    await fixture.whenStable();
    expect(router.navigate).toHaveBeenCalledWith(['/home/products']);
  });

  it('should load products for selected category', () => {
    const categoryId = 1;
    component.onSelectCategory(categoryId);
    expect(loadProductsSpy).toHaveBeenCalledWith('maincategoryid=' + categoryId);
  });

  it('should load products for search keyword', () => {
    const searchKeyword = { categoryId: 1, keyword: 'test' };
    component.onSearchKeyword(searchKeyword);
    expect(loadProductsSpy).toHaveBeenCalledWith('maincategoryid=1&keyword=test');
  });

  afterEach(() => {
    fixture.destroy();
  });
});
