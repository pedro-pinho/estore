import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CategoriesStoreItem } from '../../services/category/categories.storeItem';
import { CartStoreItem } from '../../services/cart/cart.storeItem';
import { UserService } from '../../services/users/user.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockCategoryStore: any;
  let mockCartStore: any;
  let mockUserService: any;
  let router: Router;

  beforeEach(async () => {
    mockCategoryStore = {
      topLevelCategories$: of([{ id: 1, category: 'Electronics' }])
    };

    mockCartStore = {
      cart$: of({ totalProducts: 3 })
    };

    mockUserService = {
      isUserAuthenticated$: of(false),
      loggedInUser$: of({ first_name: 'John' }),
      logoutUser: jasmine.createSpy('logoutUser')
    };

    await TestBed.configureTestingModule({
      imports: [
        HeaderComponent,
        FontAwesomeModule,
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: CategoriesStoreItem, useValue: mockCategoryStore },
        { provide: CartStoreItem, useValue: mockCartStore },
        { provide: UserService, useValue: mockUserService }
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display search bar when on /home/products', () => {
    component.displaySearch = true;
    fixture.detectChanges();
    const searchBarContainer = fixture.debugElement.query(By.css('#search-bar-container'));
    expect(searchBarContainer).toBeTruthy();
  });

  it('should emit searchClicked event with correct parameters', () => {
    spyOn(component.searchClicked, 'emit');
    const keyword = 'laptop';
    const categoryId = '1';

    component.onClickSearch(keyword, categoryId);

    expect(component.searchClicked.emit).toHaveBeenCalledWith({ keyword, categoryId: parseInt(categoryId) });
  });

  it('should navigate to cart on navigateToCart', () => {
    spyOn(router, 'navigate');

    component.navigateToCart();

    expect(router.navigate).toHaveBeenCalledWith(['/home/cart']);
  });

  it('should navigate to login on navigateToLogin', () => {
    spyOn(router, 'navigate');

    component.navigateToLogin();

    expect(router.navigate).toHaveBeenCalledWith(['/home/login']);
  });

  it('should navigate to signup on navigateToSignup', () => {
    spyOn(router, 'navigate');

    component.navigateToSignup();

    expect(router.navigate).toHaveBeenCalledWith(['/home/signup']);
  });

  it('should navigate to order history on navigateToOrderHistory', () => {
    spyOn(router, 'navigate');

    component.navigateToOrderHistory();

    expect(router.navigate).toHaveBeenCalledWith(['/home/order-history']);
  });

  it('should logout user and navigate to products on logout', () => {
    spyOn(router, 'navigate');

    component.logout();

    expect(mockUserService.logoutUser).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/home/products']);
  });

  it('should unsubscribe from subscriptions on ngOnDestroy', () => {
    spyOn(component.subscriptions, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.subscriptions.unsubscribe).toHaveBeenCalled();
  });
});
