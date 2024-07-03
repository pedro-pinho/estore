import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import { CartStoreItem } from '../../services/cart/cart.storeItem';
import { CartStoreItemMock } from '../../../shared/mocks/cart.storeItem.mock';
import { UserService } from '../../services/users/user.service';
import { UserServiceMock } from '../../../shared/mocks/user.service.mock';
import { OrderService } from '../../services/order/order.service';
import { OrderServiceMock } from '../../../shared/mocks/order.service.mock';
import { Router, RouterEvent } from '@angular/router';
import { ReplaySubject, of, throwError } from 'rxjs';
import { AlertType } from '../../types/alert.type';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartStoreItem: CartStoreItem;
  let orderService: OrderService;
  let userService: UserServiceMock;

  const cartItemMock = {
    product: {
      id: 1,
      name: 'Test',
      description: 'Test',
      price: 1,
      image: 'test',
      rating: 1,
      category_id: 1,
    },
    quantity: 1,
    amount: 1,
  };
  const orderFormMock = {
    name: 'Test',
    address: 'Test',
    city: 'Test',
    state: 'Test',
    pin: '123456',
  };
  const eventSubject: ReplaySubject<RouterEvent> =
    new ReplaySubject<RouterEvent>(1);
  const routerMock = {
    events: eventSubject.asObservable(),
    navigate: jasmine.createSpy('navigate'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartComponent],
      providers: [
        {
          provide: CartStoreItem,
          useClass: CartStoreItemMock,
        },
        {
          provide: UserService,
          useClass: UserServiceMock,
        },
        {
          provide: OrderService,
          useClass: OrderServiceMock,
        },
        {
          provide: Router,
          useValue: routerMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as unknown as UserServiceMock;
    cartStoreItem = TestBed.inject(CartStoreItem);
    orderService = TestBed.inject(OrderService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should increase quantity correctly', () => {
    const increaseProductQuantity = spyOn(cartStoreItem, 'addProduct');
    const $event = {
      target: {
        innerText: '+',
      },
    };
    component.updateQuantity($event, cartItemMock);
    expect(increaseProductQuantity).toHaveBeenCalledWith(cartItemMock.product);
  });

  it('should decrease quantity correctly', () => {
    const decreaseProductQuantity = spyOn(
      cartStoreItem,
      'decreaseProductQuantity'
    );
    const $event = {
      target: {
        innerText: '-',
      },
    };
    component.updateQuantity($event, cartItemMock);
    expect(decreaseProductQuantity).toHaveBeenCalledWith(cartItemMock);
  });

  it('should navigate to home', () => {
    component.navigateToHome();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/home/products']);
  });

  it('should remove product from cart', () => {
    const removeProduct = spyOn(cartStoreItem, 'removeProduct');
    component.removeItem(cartItemMock);
    expect(removeProduct).toHaveBeenCalledWith(cartItemMock);
  });

  it('should require user authentication to submit a form', fakeAsync(() => {
    const saveOrder = spyOn(orderService, 'saveOrder').and.returnValue(of({}));
    userService.isUserAuthenticated = false;
    component.onSubmit();
    expect(saveOrder).not.toHaveBeenCalled();

    userService.isUserAuthenticated = true;
    component.orderForm.setValue(orderFormMock);
    component.onSubmit();
    jasmine.clock().tick(1000);
    expect(saveOrder).toHaveBeenCalled();
  }));

  it('should require name to submit', () => {
    const saveOrder = spyOn(orderService, 'saveOrder');
    const mockNoName = {
      ...orderFormMock,
      name: '',
    };
    component.orderForm.patchValue(mockNoName);
    component.onSubmit();
    expect(saveOrder).not.toHaveBeenCalled();
  });

  it('should require address to submit', () => {
    const saveOrder = spyOn(orderService, 'saveOrder');
    const mockNoAddress = {
      ...orderFormMock,
      address: '',
    };
    component.orderForm.patchValue(mockNoAddress);
    component.onSubmit();
    expect(saveOrder).not.toHaveBeenCalled();
  });

  it('should require city to submit', () => {
    const saveOrder = spyOn(orderService, 'saveOrder');
    const mockNoCity = {
      ...orderFormMock,
      city: '',
    };
    component.orderForm.patchValue(mockNoCity);
    component.onSubmit();
    expect(saveOrder).not.toHaveBeenCalled();
  });

  it('should require state to submit', () => {
    const saveOrder = spyOn(orderService, 'saveOrder');
    const mockNoState = {
      ...orderFormMock,
      state: '',
    };
    component.orderForm.patchValue(mockNoState);
    component.onSubmit();
    expect(saveOrder).not.toHaveBeenCalled();
  });

  it('should require pin to submit', () => {
    const saveOrder = spyOn(orderService, 'saveOrder');
    const mockNoPin = {
      ...orderFormMock,
      pin: '',
    };
    component.orderForm.patchValue(mockNoPin);
    component.onSubmit();
    expect(saveOrder).not.toHaveBeenCalled();
  });

  it('should show alert on successful order', fakeAsync(() => {
    spyOn(orderService, 'saveOrder').and.returnValue(of({}));

    userService.isUserAuthenticated = true;
    component.orderForm.setValue(orderFormMock);
    component.onSubmit();
    jasmine.clock().tick(1000);

    expect(component.alert?.type).toBe(AlertType.Success);
    expect(component.alert?.message).toBe('Order Placed Successfully');
  }));

  it('should clear cart on successful order', fakeAsync(() => {
    spyOn(orderService, 'saveOrder').and.returnValue(of({}));
    const clearCart = spyOn(cartStoreItem, 'clearCart');

    userService.isUserAuthenticated = true;
    component.orderForm.setValue(orderFormMock);
    component.onSubmit();
    jasmine.clock().tick(1000);

    expect(clearCart).toHaveBeenCalled();
  }));

  it('should disable checkout on successful order', fakeAsync(() => {
    spyOn(orderService, 'saveOrder').and.returnValue(of({}));

    userService.isUserAuthenticated = true;
    component.orderForm.setValue(orderFormMock);
    component.onSubmit();
    jasmine.clock().tick(1000);

    expect(component.disableCheckout).toBeTrue();
  }));

  it('should navigate to products on successful order', fakeAsync(() => {
    spyOn(orderService, 'saveOrder').and.returnValue(of({}));

    userService.isUserAuthenticated = true;
    component.orderForm.setValue(orderFormMock);
    component.onSubmit();
    jasmine.clock().tick(1000);

    expect(routerMock.navigate).toHaveBeenCalledWith(['/home/products']);
  }));

  it('should show an alert on failed order', fakeAsync(() => {
    spyOn(orderService, 'saveOrder').and.returnValue(
      throwError(() => ({ error: { message: 'Order Failed' } }))
    );

    userService.isUserAuthenticated = true;
    component.orderForm.setValue(orderFormMock);
    component.onSubmit();
    jasmine.clock().tick(1000);

    expect(component.alert?.type).toBe(AlertType.Error);
    expect(component.alert?.message).toBe('Order Failed');
  }));

  it('should unsubscribe on destroy', () => {
    const unsubscribeSpy = spyOn(component.subscriptions, 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
