import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuAdmin } from '../interfaces/MenuAdmin';



@Injectable({
  providedIn: 'root'
})
export class MenuAdminService {

  constructor(private http:HttpClient) { }

  getMenu():Observable<MenuAdmin[]> {
   return this.http.get<MenuAdmin[]>('/assets/data/menu.json');
  }
}
