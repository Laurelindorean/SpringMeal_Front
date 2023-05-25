import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../Model/Category';
import { Dish } from '../Model/Dish';
import { Order } from '../Model/Order';
import { User } from '../Model/User';
import { Slot } from '../Model/Slot';
import { CookieService } from 'ngx-cookie-service';
import { Allergen } from '../Model/allergen';
import { DishAllergen } from '../Model/dishAllergen';
import { OrderDish } from '../Model/OrderDish';

@Injectable({
  providedIn: 'root',
})
export class ManagementService {
  //private api = 'http://localhost:6752/api';
 private api = 'https://springmealback-production.up.railway.app/api';
  private token: string;
  private httpHeaders: { headers: HttpHeaders };

  constructor(private http: HttpClient, private cookie: CookieService) {
    this.token = this.cookie.get('token');
    this.httpHeaders = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      }),
    };
  }

  //CRUD Categories
  getCategoryById(id: number): Observable<any> {
    return this.http.get(`${this.api}/categories/${id}`, this.httpHeaders);
  }
  getAllCategories(): Observable<any> {
    return this.http.get(`${this.api}/categories`, this.httpHeaders);
  }
  addCategory(category: Category): Observable<any> {
    return this.http.post(`${this.api}/categories`, category, this.httpHeaders);
  }
  updateCategory(id: number, updatedCategory: Category): Observable<any> {
    return this.http.put(
      `${this.api}/categories/${id}`,
      updatedCategory,
      this.httpHeaders
    );
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.api}/categories/${id}`, this.httpHeaders);
  }

  //CRUD Dishes
  getAllDishes(): Observable<any> {
    return this.http.get(`${this.api}/dishes`, this.httpHeaders);
  }
  getDishById(idDish: number): Observable<any> {
    return this.http.get(`${this.api}/dishes/${idDish}`, this.httpHeaders);
  }

  addDish(dish: Dish): Observable<any> {
    return this.http.post(`${this.api}/dishes`, dish, this.httpHeaders);
  }
  getDishByName(name: string): Observable<any> {
    return this.http.get(
      `${this.api}/dishes/partialName/${name}`,
      this.httpHeaders
    );
  }

  getDishByCategory(nameCategory: string): Observable<any> {
    return this.http.get(
      `${this.api}/dishes/category/${nameCategory}`,
      this.httpHeaders
    );
  }

  updateDishes(idDish: number, updatedDish: Dish): Observable<any> {
    return this.http.put(
      `${this.api}/dishes/${idDish}`,
      updatedDish,
      this.httpHeaders
    );
  }

  deleteDish(idDish: number): Observable<any> {
    return this.http.delete(`${this.api}/dishes/${idDish}`, this.httpHeaders);
  }
  getDishSortedByName(): Observable<any> {
    return this.http.get(`${this.api}/dishes/sortByName`, this.httpHeaders);
  }
  getDishSortedByPrice(): Observable<any> {
    return this.http.get(`${this.api}/dishes/sortByPrice`, this.httpHeaders);
  }

  //CRUD Orders

  getAllOrders(): Observable<any> {
    return this.http.get(`${this.api}/orders`, this.httpHeaders);
  }

  getOrderById(idOrder: number): Observable<any> {
    return this.http.get(`${this.api}/orders/${idOrder}`, this.httpHeaders);
  }

  addOrder(order: any): Observable<any> {
    return this.http.post(`${this.api}/orders`, order, this.httpHeaders);
  }

  updateOrder(idOrder: number, updatedOrder: Order): Observable<any> {
    return this.http.put(
      `${this.api}/orders/${idOrder}`,
      updatedOrder,
      this.httpHeaders
    );
  }

  deleteOrder(idOrder: number): Observable<any> {
    return this.http.delete(`${this.api}/orders/${idOrder}`, this.httpHeaders);
  }

  //CRUD users

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.api}/users`, this.httpHeaders);
  }

  addUser(user:User): Observable<any>{
    console.log(user);
    return this.http.post(`${this.api}/users`, user, this.httpHeaders);
  }

  //This endpoint is just for the users
  getUserById(idUser: number): Observable<any> {
    return this.http.get(`${this.api}/users/${idUser}`, this.httpHeaders);
  }

  //this endpoint is just for the admin
  getUserByIdAdmin(idUser: number): Observable<any> {
    return this.http.get(`${this.api}/users/admin/${idUser}`, this.httpHeaders);
  }

  //This endpoint is just for the users
  updateUser(idUser: number, updatedUser: User): Observable<any> {
    return this.http.put(
      `${this.api}/users/${idUser}`,
      updatedUser,
      this.httpHeaders
    );
  }

  updateUserByAdmin(idUser: number, updatedUser: User): Observable<any> {
    return this.http.put(
      `${this.api}/users/update/${idUser}`,
      updatedUser,
      this.httpHeaders
    );
  }

  deleteUser(idUser: number): Observable<any> {
    return this.http.delete(`${this.api}/users/${idUser}`, this.httpHeaders);
  }

  // CRUD Slot

  getAllSlots(): Observable<any> {
    return this.http.get(`${this.api}/slot`, this.httpHeaders);
  }

  addSlot(slot: Slot): Observable<any> {
    return this.http.post(`${this.api}/slot`, slot, this.httpHeaders);
  }

  deleteSlot(idSlot: number): Observable<any> {
    return this.http.delete(`${this.api}/slot/${idSlot}`, this.httpHeaders);
  }

  //CRUD Allergens

  getAllAllergens(): Observable<any> {
    return this.http.get(`${this.api}/allergens`, this.httpHeaders);
  }

  addAllergen(allergen: Allergen): Observable<any> {
    return this.http.post(`${this.api}/allergens`, allergen, this.httpHeaders);
  }

  updateAllergen(
    idAllergen: number,
    updatedAllergen: Allergen
  ): Observable<any> {
    return this.http.put(
      `${this.api}/allergens/${idAllergen}`,
      updatedAllergen,
      this.httpHeaders
    );
  }

  deleteAllergen(idAllergen: number): Observable<any> {
    return this.http.delete(
      `${this.api}/allergens/${idAllergen}`,
      this.httpHeaders
    );
  }

  getAllergenById(idAllergen: number): Observable<any> {
    return this.http.get(
      `${this.api}/allergens/${idAllergen}`,
      this.httpHeaders
    );
  }

  getAllergensByName(name: string): Observable<any> {
    return this.http.get(
      `${this.api}/allergens/name/${name}`,
      this.httpHeaders
    );
  }

  // CRUD DishAllergens

  getAllDishAllergens(): Observable<any> {
    return this.http.get(`${this.api}/dishallergens`, this.httpHeaders);
  }

  addDishAllergen(dishAllergen: DishAllergen): Observable<any> {
    return this.http.post(
      `${this.api}/dishallergens`,
      dishAllergen,
      this.httpHeaders
    );
  }

  updateDishAllergen(
    idDishAllergen: number,
    updatedDisAllergen: DishAllergen
  ): Observable<any> {
    return this.http.put(
      `${this.api}/dishallergens/${idDishAllergen}`,
      updatedDisAllergen,
      this.httpHeaders
    );
  }

  getDishAllergenById(idDishAllergen: number): Observable<any> {
    return this.http.get(
      `${this.api}/dishallergens/${idDishAllergen}`,
      this.httpHeaders
    );
  }

  deleteDishAllergen(idDishAllergen: number): Observable<any> {
    return this.http.delete(
      `${this.api}/dishallergens/${idDishAllergen}`,
      this.httpHeaders
    );
  }

  //CRUD OrderDish

  getAllOrderDish(): Observable<any> {
    return this.http.get(`${this.api}/orderdish`, this.httpHeaders);
  }

  addOrderDish(orderDish: OrderDish): Observable<any> {
    return this.http.post(`${this.api}/orderdish`, orderDish, this.httpHeaders);
  }

  getOrderDishById(idOrderDish: number): Observable<any> {
    return this.http.get(
      `${this.api}/orderdish/${idOrderDish}`,
      this.httpHeaders
    );
  }

  updateOrderDish(
    idOrderDish: number,
    orderDishUpdated: OrderDish
  ): Observable<any> {
    return this.http.put(
      `${this.api}/orderdish/${idOrderDish}`,
      orderDishUpdated,
      this.httpHeaders
    );
  }

  deleteOrderDish(idOrderDish: number): Observable<any> {
    return this.http.delete(
      `${this.api}/orderdish/${idOrderDish}`,
      this.httpHeaders
    );
  }

//I'm not sure of this one. It gives me an error, I don't know hot to solve.
  /*
  getOrderDishByOrder(order:Order): Observable<any>{
    return this.http.get(`${this.api}/orderdish/order`, order, this.httpHeaders);
  }
  */
}
