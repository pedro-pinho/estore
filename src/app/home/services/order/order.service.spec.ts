import { TestBed } from '@angular/core/testing';
import { HttpTestingController, TestRequest, provideHttpClientTesting } from '@angular/common/http/testing';
import { OrderService } from './order.service';
import { CartStoreItem } from '../cart/cart.storeItem';
import { UserService } from '../users/user.service';
import { DeliveryAddress } from '../../types/cart.type';
import { CartStoreItemMock } from '../../../shared/mocks/cart.storeItem.mock';
import { UserServiceMock } from '../../../shared/mocks/user.service.mock';
import { provideHttpClient } from '@angular/common/http';

describe('OrderService', () => {
  let service: OrderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        OrderService,
        { provide: CartStoreItem, useClass: CartStoreItemMock },
        { provide: UserService, useClass: UserServiceMock },
      ],
    });

    service = TestBed.inject(OrderService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call post query on save orders', () => {
    const deliveryAddress: DeliveryAddress = {
      userName: 'John Doe',
      address: '123 Main St',
      city: 'Anytown',
      state: 'Anystate',
      pin: '12345',
    };
    const userEmail = 'john@gmail.com';
    service.saveOrder(deliveryAddress, userEmail).subscribe();

    const request: TestRequest = httpMock.expectOne((req) => req.url === 'http://localhost:5001/orders/add');

    expect(request.request.method).toBe('POST');
    expect(request.request.headers.get('Authorization')).toBe('token123');
  });

  it('should call get query on get order history', () => {
    const userEmail = 'john@gmail.com';
    service.getOrderHistory(userEmail).subscribe();

    const request: TestRequest = httpMock.expectOne((req) => req.url === 'http://localhost:5001/orders/list/' + userEmail);

    expect(request.request.method).toBe('GET');
    expect(request.request.headers.get('Authorization')).toBe('token123');
  });

  it('should call get query on get order history products', () => {
    const orderId = 1;
    service.getOrderHistoryProducts(orderId).subscribe();

    const request: TestRequest = httpMock.expectOne((req) => req.url === 'http://localhost:5001/orders/details/' + orderId);

    expect(request.request.method).toBe('GET');
    expect(request.request.headers.get('Authorization')).toBe('token123');
  });
});
