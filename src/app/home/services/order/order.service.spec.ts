import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OrderService } from './order.service';
import { CartStoreItem } from '../cart/cart.storeItem';
import { UserService } from '../users/user.service';
import { DeliveryAddress } from '../../types/cart.type';
import { OrderHistory, OrderHistoryProduct } from '../../types/order.type';

describe('OrderService', () => {
  let service: OrderService;
  let httpMock: HttpTestingController;
  let mockCartStoreItem: jasmine.SpyObj<CartStoreItem>;
  let mockUserService: jasmine.SpyObj<UserService>;

  beforeEach(() => {
    mockCartStoreItem = jasmine.createSpyObj('CartStoreItem', [], {
      cart: {
        products: [
          { product: { id: 1, price: 100 }, quantity: 2, amount: 200 },
        ],
        totalAmount: 200,
      },
    });

    mockUserService = jasmine.createSpyObj('UserService', [], {
      token: 'fake-token',
    });

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OrderService,
        { provide: CartStoreItem, useValue: mockCartStoreItem },
        { provide: UserService, useValue: mockUserService },
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

  describe('saveOrder', () => {
    it('should save order and return response', () => {
      const deliveryAddress: DeliveryAddress = {
        userName: 'John Doe',
        address: '123 Main St',
        city: 'Anytown',
        state: 'Anystate',
        pin: '12345',
      };
      const userEmail = 'john@example.com';
      const mockResponse = { success: true };

      service.saveOrder(deliveryAddress, userEmail).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne('http://localhost:5001/orders/add');
      expect(req.request.method).toBe('POST');
      expect(req.request.headers.get('Authorization')).toBe('fake-token');
      req.flush(mockResponse);
    });
  });

  describe('getOrderHistory', () => {
    it('should return order history for a user', () => {
      const userEmail = 'john@example.com';
      const mockOrderHistory: OrderHistory[] = [
        { id: 1, user_name: 'John Doe', address: '123 Main St', city: 'Anytown', state: 'Anystate', pin: '12345', total: 200, order_date: '2023-01-01' },
      ];

      service.getOrderHistory(userEmail).subscribe(orderHistory => {
        expect(orderHistory).toEqual(mockOrderHistory);
      });

      const req = httpMock.expectOne('http://localhost:5001/orders/list/john@example.com');
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('Authorization')).toBe('fake-token');
      req.flush(mockOrderHistory);
    });

    it('should return an empty observable if userEmail is missing', () => {
      service.getOrderHistory('').subscribe(orderHistory => {
        expect(orderHistory.length).toBe(0);
      });

      httpMock.expectNone('http://localhost:5001/orders/list/');
    });
  });

  describe('getOrderHistoryProducts', () => {
    it('should return order history products for an order', () => {
      const orderId = 1;
      const mockOrderHistoryProducts: OrderHistoryProduct[] = [
        { productId: 1, name: 'Product 1', image: 'image1.jpg', quantity: 2, price: 100, amount: 200 },
      ];

      service.getOrderHistoryProducts(orderId).subscribe(orderHistoryProducts => {
        expect(orderHistoryProducts).toEqual(mockOrderHistoryProducts);
      });

      const req = httpMock.expectOne('http://localhost:5001/orders/details/1');
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('Authorization')).toBe('fake-token');
      req.flush(mockOrderHistoryProducts);
    });

    it('should return an empty observable if orderId is missing', () => {
      service.getOrderHistoryProducts(0).subscribe(orderHistoryProducts => {
        expect(orderHistoryProducts.length).toBe(0);
      });

      httpMock.expectNone('http://localhost:5001/orders/details/0');
    });
  });
});
