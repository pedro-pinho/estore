import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { CategoryNavigationComponent } from './components/category-navigation/category-navigation.component';
import { SidebarNavigationComponent } from './components/sidebar-navigation/sidebar-navigation.component';
import { ProductsComponent } from './components/products/products.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, CategoryNavigationComponent, SidebarNavigationComponent, ProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
