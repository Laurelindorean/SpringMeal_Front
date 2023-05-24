import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/Model/Category';
import { ManagementService } from 'src/app/Service/management.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css'],
})
export class AdminCategoryComponent implements OnInit {
  categories?: Category[] = [];
  category={

    name:'',
  };
  isCategoryAdded = false;

  constructor(private router: Router, private management: ManagementService) {}
  ngOnInit(): void {
    this.management.getAllCategories().subscribe(
      (data) => {
        data.forEach((categoryJson: any) => {
          let categoryDTO: Category = {
            idCategory: categoryJson.id,
            name: categoryJson.name,
          };
          this.categories?.push(categoryDTO);
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  return() {
    this.router.navigateByUrl('/welcome');
  }


  newCategory():void{
    this.isCategoryAdded = false;
    this.category ={
      name: '',
    };
  }
}
