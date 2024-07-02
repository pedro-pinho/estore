import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarNavigationComponent } from './sidebar-navigation.component';
import { CategoriesStoreItem } from '../../services/category/categories.storeItem';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('SidebarNavigationComponent', () => {
  let component: SidebarNavigationComponent;
  let fixture: ComponentFixture<SidebarNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarNavigationComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), CategoriesStoreItem]
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
