import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './Login/login/login.component';
import { RegisterComponent } from './Login/register/register.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { DishComponent } from './OrdersDishes/dish/dish.component';
import { OrderComponent } from './OrdersDishes/order/order.component';
import { CategoryComponent } from './category/category.component';
import { AdminUserComponent } from './Admin/admin-user/admin-user.component';
import { AdminSlotComponent } from './Admin/admin-slot/admin-slot.component';
import { AdminCategoryComponent } from './Admin/admin-category/admin-category.component';
import { AdminOrderComponent } from './Admin/admin-order/admin-order.component';
import { ContactComponent } from './contact/contact.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminDishComponent } from './Admin/admin-dish/admin-dish.component';
import { CreateCategoryComponent } from './Admin/create-category/create-category.component';
import { AdminAllergenComponent } from './Admin/admin-allergen/admin-allergen.component';
import { CreateUserComponent } from './Admin/create-user/create-user.component';
import { CreateOrderComponent } from './Admin/create-order/create-order.component';
import { CreateAllergenComponent } from './Admin/create-allergen/create-allergen.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { DishListComponent } from './OrdersDishes/dish-list/dish-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: RegisterComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'admin/order', component: AdminOrderComponent },
  { path: 'admin/category', component: AdminCategoryComponent },
  { path: 'admin/slot', component: AdminSlotComponent },
  { path: 'admin/user', component: AdminUserComponent },
  { path: 'admin/create-category', component: CreateCategoryComponent },
  { path: 'order', component: OrderComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'admin/dish', component: AdminDishComponent },
  { path: 'admin/create-user', component: CreateUserComponent },
  { path: 'admin/allergen', component: AdminAllergenComponent },
  { path: 'admin/create-order', component: CreateOrderComponent },
  { path: 'admin/create-allergen', component: CreateAllergenComponent },
  { path: 'dish-list', component: DishListComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
