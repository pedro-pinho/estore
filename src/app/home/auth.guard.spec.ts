import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterEvent, RouterStateSnapshot } from '@angular/router';
import { UserService } from './services/users/user.service';
import { UserServiceMock } from '../shared/mocks/user.service.mock';
import { ReplaySubject } from 'rxjs';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  const eventSubject: ReplaySubject<RouterEvent> = new ReplaySubject<RouterEvent>(1);
  const routerMock = {
    events: eventSubject.asObservable(),
    navigate: jasmine.createSpy('navigate'),
  };
  let router: Router;
  let userService: UserServiceMock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: UserService, useClass: UserServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });
    router = TestBed.inject(Router);
    userService = TestBed.inject(UserService) as unknown as UserServiceMock;
  });

  function executeGuard() {
    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;
    return TestBed.runInInjectionContext(() => AuthGuard(route, state));
  }

  it('should not allow the unauthenticated user to activate', async () => {
    userService.isUserAuthenticated = false;
    const result = await executeGuard();
    expect(result).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/home/login']);
  });

  it('should allow the authenticated user to activate', async () => {
    userService.isUserAuthenticated = true;
    const result = await executeGuard();
    expect(result).toBe(true);
  });
});
