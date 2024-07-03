import { TestBed } from '@angular/core/testing';

import { ProductsService } from '../../services/product/products.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, TestRequest, provideHttpClientTesting } from '@angular/common/http/testing';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(),provideHttpClientTesting()],
    });
    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call get query on get all products', () => {
    service.getAllProducts().subscribe();
    const request: TestRequest = httpMock.expectOne((req) => req.url === 'http://localhost:5001/products');
    expect(request.request.method).toBe('GET');
  });

  it('should call get query on get all products with filter', () => {
    const query = 'test=test';
    service.getAllProducts(query).subscribe();
    const request: TestRequest = httpMock.expectOne((req) => req.url === 'http://localhost:5001/products?test=test');
    expect(request.request.method).toBe('GET');
  });

  it('should call get query on get product', () => {
    const id = 1;
    service.getProduct(id).subscribe();
    const request: TestRequest = httpMock.expectOne((req) => req.url === 'http://localhost:5001/products/1');
    expect(request.request.method).toBe('GET');
  });

});
