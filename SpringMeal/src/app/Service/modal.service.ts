import { Injectable } from '@angular/core';
import { CreateCategoryComponent } from '../Admin/create-category/create-category.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private createCategory: CreateCategoryComponent[] = [];

  add(modal:CreateCategoryComponent){

  }

  constructor() { }
}
