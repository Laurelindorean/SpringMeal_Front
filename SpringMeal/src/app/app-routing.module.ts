import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './Login/login/login.component';
import { RegisterComponent } from './Login/register/register.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { DishComponent } from './dish/dish.component';
import { OrderComponent } from './order/order.component';
import { CategoryComponent } from './category/category.component';
import { AdminUserComponent } from './Admin/admin-user/admin-user.component';
import { AdminSlotComponent } from './Admin/admin-slot/admin-slot.component';
import { AdminCategoryComponent } from './Admin/admin-category/admin-category.component';
import { AdminOrderComponent } from './Admin/admin-order/admin-order.component';
import { ContactComponent } from './contact/contact.component';
import { ProfileComponent } from './profile/profile.component';
import { DishListComponent } from './dish-list/dish-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: RegisterComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'admin/dish', component: DishComponent },
  { path: 'admin/order', component: AdminOrderComponent },
  { path: 'admin/category', component: AdminCategoryComponent},
  { path: 'admin/slot', component: AdminSlotComponent},
  { path: 'admin/user', component: AdminUserComponent},
  { path: 'order', component: OrderComponent},
  { path: 'contact', component: ContactComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'dish-list', component: DishListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule],
})
export class AppRoutingModule {}
