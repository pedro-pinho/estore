import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderHistoryComponent } from './order-history.component';
import { UserService } from '../../services/users/user.service';
import { UserServiceMock } from '../../../shared/mocks/user.service.mock';
import { OrderService } from '../../services/order/order.service';
import { OrderServiceMock } from '../../../shared/mocks/order.service.mock';

describe('OrderHistoryComponent', () => {
  let component: OrderHistoryComponent;
  let fixture: ComponentFixture<OrderHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderHistoryComponent],
      providers: [
        { provide: UserService, useClass: UserServiceMock },
        { provide: OrderService, useClass: OrderServiceMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load order history on init', () => {
    component.ngOnInit();
    expect(component.pastOrders.length).toBe(1);
  });

  it('should load products for a selected order', () => {
    component.selectOrder({ target: { value: 1 } });

    expect(component.pastOrder).toBeTruthy();
    expect(component.pastOrderProducts.length).toBe(2);
  });

  it('should reset products when no order is selected', () => {
    component.selectOrder({ target: { value: 0 } });
    expect(component.pastOrderProducts.length).toBe(0);
  });

  it('should unsubscribe on destroy', () => {
    const spy = spyOn(component.subscriptions, 'unsubscribe');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });
});
