import { Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// HTTP
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Login/login/login.component';
import { RegisterComponent } from './Login/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { WelcomeComponent } from './welcome/welcome.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CategoryComponent } from './category/category.component';
import { DishComponent } from './dish/dish.component';
import { OrderComponent } from './order/order.component';
import { AdminDishComponent } from './Admin/admin-dish/admin-dish.component';
import { AdminOrderComponent } from './Admin/admin-order/admin-order.component';
import { AdminUserComponent } from './Admin/admin-user/admin-user.component';
import { AdminSlotComponent } from './Admin/admin-slot/admin-slot.component';
import { AdminCategoryComponent } from './Admin/admin-category/admin-category.component';
import { ContactComponent } from './contact/contact.component';
import { ProfileComponent } from './profile/profile.component';
import { CreateCategoryComponent } from './Admin/create-category/create-category.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AdminAllergenComponent } from './Admin/admin-allergen/admin-allergen.component';
import { NavbarAdminComponent } from './Admin/navbar-admin/navbar-admin.component';
import { MatIconModule } from '@angular/material/icon';
import { CreateUserComponent } from './Admin/create-user/create-user.component';
import { CreateOrderComponent } from './Admin/create-order/create-order.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    WelcomeComponent,
    NavbarComponent,
    CategoryComponent,
    DishComponent,
    OrderComponent,
    AdminDishComponent,
    AdminOrderComponent,
    AdminUserComponent,
    AdminSlotComponent,
    AdminCategoryComponent,
    ContactComponent,
    ProfileComponent,
    CreateCategoryComponent,
    AdminAllergenComponent,
    NavbarAdminComponent,
    CreateUserComponent,
    CreateOrderComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule


  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
