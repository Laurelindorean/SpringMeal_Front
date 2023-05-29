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
import { CreateDishComponent } from './Admin/create-dish/create-dish.component';
import { guardsGuard } from './Security/guards.guard';

const routes: Routes = [
   //path: '', pathMatch: 'full', redirectTo: 'login'

  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: RegisterComponent},
  { path: 'welcome', component: WelcomeComponent},
  { path: 'order', component: OrderComponent, canActivate: [guardsGuard] },
  { path: 'contact', component: ContactComponent, canActivate: [guardsGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [guardsGuard] },
  { path: 'about-us', component: AboutUsComponent, canActivate: [guardsGuard] },
  { path: 'admin/order', component: AdminOrderComponent, canActivate: [guardsGuard] },
  { path: 'admin/category', component: AdminCategoryComponent, canActivate: [guardsGuard] },
  { path: 'admin/slot', component: AdminSlotComponent, canActivate: [guardsGuard] },
  { path: 'admin/user', component: AdminUserComponent, canActivate: [guardsGuard] },
  { path: 'admin/dish', component: AdminDishComponent, canActivate: [guardsGuard] },
  { path: 'admin/allergen', component: AdminAllergenComponent, canActivate: [guardsGuard] },
  { path: 'admin/create-user', component: CreateUserComponent, canActivate: [guardsGuard] },
  { path: 'admin/create-order', component: CreateOrderComponent, canActivate: [guardsGuard] },
  { path: 'admin/create-allergen', component: CreateAllergenComponent, canActivate: [guardsGuard] },
  { path: 'admin/create-category', component: CreateCategoryComponent, canActivate: [guardsGuard] },
  { path: 'admin/create-dish', component: CreateDishComponent, canActivate: [guardsGuard] },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
