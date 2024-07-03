import { TestBed } from '@angular/core/testing';
import type { Product } from '../../types/product.type';
import { CartStoreItem } from './cart.storeItem';

describe('CartStoreItem', () => {
  let service: CartStoreItem;
  const fakeProduct: Product = { id: 1, price: 100, name: 'Product 1', description: 'Description 1', image: 'image1', rating: 4, category_id: 1 }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartStoreItem],
    });
    service = TestBed.inject(CartStoreItem);
    sessionStorage.clear();
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with an empty cart if sessionStorage is empty', () => {
    expect(service.cart.products.length).toBe(0);
    expect(service.cart.totalAmount).toBe(0);
    expect(service.cart.totalProducts).toBe(0);
  });

  it('should initialize with a stored cart if sessionStorage contains a cart', () => {
    const storedCart = {
      products: [{ product: { id: 1, price: 100 }, quantity: 1, amount: 100 }],
      totalAmount: 100,
      totalProducts: 1,
    };
    sessionStorage.setItem('cart', JSON.stringify(storedCart));

    const newService = new CartStoreItem();
    expect(newService.cart.products.length).toBe(1);
    expect(newService.cart.totalAmount).toBe(100);
    expect(newService.cart.totalProducts).toBe(1);
  });

  it('should add a product to the cart', () => {
    const product: Product = fakeProduct;
    service.addProduct(product);

    expect(service.cart.products.length).toBe(1);
    expect(service.cart.products[0].product.id).toBe(1);
    expect(service.cart.products[0].quantity).toBe(1);
    expect(service.cart.totalAmount).toBe(100);
    expect(service.cart.totalProducts).toBe(1);
  });

  it('should remove a product from the cart', () => {
    const product: Product = fakeProduct;
    service.addProduct(product);

    service.removeProduct(service.cart.products[0]);

    expect(service.cart.products.length).toBe(0);
    expect(service.cart.totalAmount).toBe(0);
    expect(service.cart.totalProducts).toBe(0);
  });

  it('should decrease the product quantity in the cart', () => {
    const product: Product = fakeProduct;
    service.addProduct(product);
    service.addProduct(product); // Quantity should now be 2

    service.decreaseProductQuantity(service.cart.products[0]);

    expect(service.cart.products[0].quantity).toBe(1);
    expect(service.cart.totalAmount).toBe(100);
    expect(service.cart.totalProducts).toBe(1);
  });

  it('should remove the product if quantity is decreased to zero', () => {
    const product: Product = fakeProduct;
    service.addProduct(product);

    service.decreaseProductQuantity(service.cart.products[0]);

    expect(service.cart.products.length).toBe(0);
    expect(service.cart.totalAmount).toBe(0);
    expect(service.cart.totalProducts).toBe(0);
  });

  it('should save the cart to sessionStorage', () => {
    const product: Product = fakeProduct;
    service.addProduct(product);

    expect(sessionStorage.getItem('cart')).toBeTruthy();
  });

  it('should clear the cart', () => {
    const product: Product = fakeProduct;
    service.addProduct(product);

    service.clearCart();

    expect(service.cart.products.length).toBe(0);
    expect(service.cart.totalAmount).toBe(0);
    expect(service.cart.totalProducts).toBe(0);
    expect(sessionStorage.getItem('cart')).toBeNull();
  });
});
