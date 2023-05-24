import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ManagementService } from 'src/app/Service/management.service';
import { UtilsService } from '../Service/utils.service';

@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css']
})
export class DishListComponent {
  dishesByCategory : { [key: string]: any[] } = {};
  categories : any[] = [];
  currentCategory: string = '';
  @Input() actions: string = 'chart';

  constructor(private management: ManagementService, public router: Router, public utils : UtilsService)  {}
  
  ngOnInit() : void {
    this.management.getAllCategories().subscribe(
      (data) => {
        data.forEach((category : any) => {
          if (this.currentCategory === '') {
            this.currentCategory = category.name
          }
          this.categories.push(category.name)
          console.log(category.name);
          this.management.getDishByCategory(category.name).subscribe(
            (dishes) => {
              this.dishesByCategory[category.name] = dishes.content
            }
          )
        })
      },
      (error) => {
        console.log(error);
      }
    )
    
  }

  changeCategory(category: string): void {
    this.currentCategory = category;
  }
}