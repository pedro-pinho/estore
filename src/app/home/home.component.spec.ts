import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { NavigationEnd, RouterEvent } from '@angular/router';
import { Router } from 'express';
import { ReplaySubject } from 'rxjs';
import { CategoriesStoreItem } from './services/category/categories.storeItem';
import { CategoriesStoreItemMock } from '../shared/mocks/categories.storeItem.mock';
import { ProductsStoreItem } from './services/product/products.storeItem';
import { ProductStoreItemMock } from '../shared/mocks/product.storeItem.mock';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const eventSubject: ReplaySubject<RouterEvent> =
    new ReplaySubject<RouterEvent>(1);
  const routerMock = {
    events: eventSubject.asObservable(),
    navigate: jasmine.createSpy('navigate'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        {
          provide: Router,
          useValue: routerMock,
        },
        {
          provide: CategoriesStoreItem,
          useClass: CategoriesStoreItemMock,
        },
        {
          provide: ProductsStoreItem,
          useClass: ProductStoreItemMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /home/products when visiting /home', () => {
    eventSubject.next(new NavigationEnd(1, '/home', '/home'));
    expect(routerMock.navigate).toHaveBeenCalledWith(['/home/products']);
  });
});
