import { TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { AuthGuard } from './home/auth.guard';
import { routes } from './app.routes';
import { UserService } from './home/services/users/user.service';
import { UserServiceMock } from './shared/mocks/user.service.mock';

describe('Routes', () => {
  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot(routes),
      ],
      providers: [AuthGuard, {
        provide: UserService,
        useClass: UserServiceMock,
      }]
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    router.initialNavigation();
  });

  it('should navigate to "home/products" when the empty path is accessed', async () => {
    await router.navigate(['']);
    expect(location.path()).toBe('/home/products');
  });

  it('should navigate to "home/products" for "home/products" path', async () => {
    await router.navigate(['/home/products']);
    expect(location.path()).toBe('/home/products');
  });

  it('should navigate to "home/product/:id" for "home/product/1" path', async () => {
    await router.navigate(['/home/product/1']);
    expect(location.path()).toBe('/home/product/1');
  });

  it('should navigate to "home/cart" for "home/cart" path', async () => {
    await router.navigate(['/home/cart']);
    expect(location.path()).toBe('/home/cart');
  });

  it('should navigate to "home/signup" for "home/signup" path', async () => {
    await router.navigate(['/home/signup']);
    expect(location.path()).toBe('/home/signup');
  });

  it('should navigate to "home/login" for "home/login" path', async () => {
    await router.navigate(['/home/login']);
    expect(location.path()).toBe('/home/login');
  });
});
