import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsGalleryComponent } from './home/components/products-gallery/products-gallery.component';
import { UserLoginComponent } from './home/components/users/user-login/user-login.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'products',
        component: ProductsGalleryComponent,
      },
      {
        path: 'product/:id',
        loadComponent: () => import('./home/components/product-details/product-details.component').then(m => m.ProductDetailsComponent)
      },
      {
        path: 'cart',
        loadComponent: () => import('./home/components/cart/cart.component').then(m => m.CartComponent)
      },
      {
        path: 'signup',
        loadComponent: () => import('./home/components/users/user-signup/user-signup.component').then(m => m.UserSignupComponent)
      },
      {
        path: 'login',
        component: UserLoginComponent
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home/products',
    pathMatch: 'full'
  },
  {
    path: '**',
    loadComponent: () => import('./not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];
