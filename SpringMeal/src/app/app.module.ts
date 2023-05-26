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
import { DishListComponent } from './dish-list/dish-list.component';
import { CreateCategoryComponent } from './Admin/create-category/create-category.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AdminAllergenComponent } from './Admin/admin-allergen/admin-allergen.component';
import { NavbarAdminComponent } from './Admin/navbar-admin/navbar-admin.component';
import { MatIconModule } from '@angular/material/icon';
import { CreateUserComponent } from './Admin/create-user/create-user.component';
import { CreateOrderComponent } from './Admin/create-order/create-order.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CreateAllergenComponent } from './Admin/create-allergen/create-allergen.component';
import { ButtonModalComponent } from './Modal/button-modal/button-modal.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { AcceptTermsComponent } from './Modal/accept-terms/accept-terms.component';
import { FooterComponent } from './footer/footer.component';
import { OrderButtonModal } from "./Modal/Order/Order-button-modal/order-button-modal";
import { AboutUsComponent } from './about-us/about-us.component';

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
        CreateOrderComponent,
        CreateAllergenComponent,
        DishListComponent,
        FooterComponent,
        AboutUsComponent,
    ],
    providers: [CookieService],
    bootstrap: [AppComponent],
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
        MatIconModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTableModule,
        MatPaginatorModule,
        ButtonModalComponent,
        MatDividerModule,
        MatDialogModule,
        AcceptTermsComponent,
        OrderButtonModal
    ]
})
export class AppModule {}
