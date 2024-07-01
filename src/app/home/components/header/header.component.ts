import { Component, EventEmitter, Output, OnDestroy } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faUserCircle, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CategoriesStoreItem } from '../../services/category/categories.storeItem';
import { CommonModule } from '@angular/common';
import { SearchKeyword } from '../../types/searchKeyword.type';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { CartStoreItem } from '../../services/cart/cart.storeItem';
import { UserService } from '../../services/users/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnDestroy {
  faSearch = faSearch;
  faUserCircle = faUserCircle;
  faShoppingCart = faShoppingCart;
  subscriptions: Subscription = new Subscription();

  @Output()
  searchClicked: EventEmitter<SearchKeyword> = new EventEmitter<SearchKeyword>();

  displaySearch = true;
  isUserAuthenticated = false;
  userName = '';

  constructor(
    public categoryStore: CategoriesStoreItem,
    private router: Router,
    public cartStore: CartStoreItem,
    public userService: UserService,
  ) {
    router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event) => {
      this.displaySearch = (event as NavigationEnd).url === '/home/products';
    });
    this.subscriptions.add(
      this.userService.isUserAuthenticated$.subscribe((isAuthenticated) => {
        this.isUserAuthenticated = isAuthenticated;
      }),
    );
    this.subscriptions.add(
      this.userService.loggedInUser$.subscribe((result) => {
        this.userName = result.first_name;
      }),
    );
  }

  onClickSearch(keyword: string, categoryId: string) {
    this.searchClicked.emit({ keyword, categoryId: parseInt(categoryId) });
  }

  navigateToCart(): void {
    this.router.navigate(['/home/cart']);
  }

  navigateToSignup(): void {
    this.router.navigate(['/home/signup']);
  }

  navigateToLogin(): void {
    this.router.navigate(['/home/login']);
  }

  logout(): void {
    this.userService.logoutUser();
    this.router.navigate(['/home/products']);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
