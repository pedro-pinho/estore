import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CategoriesStoreItem } from '../../services/category/categories.storeItem';
import { CartStoreItem } from '../../services/cart/cart.storeItem';
import { UserService } from '../../services/users/user.service';
import { ReplaySubject } from 'rxjs';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { UserServiceMock } from '../../../shared/mocks/user.service.mock';
import { CartStoreItemMock } from '../../../shared/mocks/cart.storeItem.mock';
import { CategoriesStoreItemMock } from '../../../shared/mocks/categories.storeItem.mock';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;

  const eventSubject: ReplaySubject<RouterEvent> = new ReplaySubject<RouterEvent>(1);
  const routerMock = {
    events: eventSubject.asObservable(),
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HeaderComponent,
        FontAwesomeModule,
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: CategoriesStoreItem, useValue: CategoriesStoreItemMock },
        { provide: CartStoreItem, useValue: CartStoreItemMock },
        { provide: UserService, useClass: UserServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to cart on navigateToCart', () => {
    component.navigateToCart();
    expect(router.navigate).toHaveBeenCalledWith(['/home/cart']);
  });

  it('should display search if navigated to products', () => {
    eventSubject.next(new NavigationEnd(1, '/home/products', '/home/products'));
    expect(component.displaySearch).toBeTrue();
  });

  it('should not display search if not navigated to products', () => {
    eventSubject.next(new NavigationEnd(1, '/home/cart', '/home/cart'));
    expect(component.displaySearch).toBeFalse();
  });

  it('should emit searchClicked on onClickSearch', () => {
    const keyword = 'keyword';
    const categoryId = '1';
    const emitSpy = spyOn(component.searchClicked, 'emit');
    component.onClickSearch(keyword, categoryId);
    expect(emitSpy).toHaveBeenCalledWith({ keyword, categoryId: parseInt(categoryId) });
  });

  it('should navigate to signup on navigateToSignup', () => {
    component.navigateToSignup();
    expect(router.navigate).toHaveBeenCalledWith(['/home/signup']);
  });

  it('should navigate to login on navigateToLogin', () => {
    component.navigateToLogin();
    expect(router.navigate).toHaveBeenCalledWith(['/home/login']);
  });

  it('should navigate to order history on navigateToOrderHistory', () => {
    component.navigateToOrderHistory();
    expect(router.navigate).toHaveBeenCalledWith(['/home/order-history']);
  });

  it('should logout on logout', () => {
    const logoutSpy = spyOn(component.userService, 'logoutUser');
    component.logout();
    expect(logoutSpy).toHaveBeenCalled();
  });

  it('should navigate to products on logout', () => {
    component.logout();
    expect(router.navigate).toHaveBeenCalledWith(['/home/products']);
  });

  it('should unsubscribe on ngOnDestroy', () => {
    const unsubscribeSpy = spyOn(component.subscriptions, 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
