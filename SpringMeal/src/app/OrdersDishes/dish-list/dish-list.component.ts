import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ManagementService } from 'src/app/Service/management.service';
import { UtilsService } from '../../Service/utils.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css']
})
export class DishListComponent {
  categories : any[] = [];
  allergens : Record<number,any[]> = {}
  currentCategory: string = '';
  @Input() actions!: string;
  @Input() dishes!: any[];


  constructor(private management: ManagementService, public router: Router, public utils : UtilsService)  {
    
  }
  
  ngOnInit() : void {
    
    this.management.getAllCategories().subscribe(
      (data) => {
        data.forEach((category : any) => {
          if (this.currentCategory === '') {
            this.currentCategory = category.name
          }
          this.categories.push(category.name)
        })
      },
      (error) => {
        console.log(error);
      }
    )
    
    this.management.getAllDishAllergens().subscribe(
      (data) => {
        data.forEach((allergen_dish : any) => {
          if (allergen_dish.dish) {
            if (!(allergen_dish.dish.id in this.allergens)) {
              this.allergens[allergen_dish.dish.id] = [];
            }
            this.allergens[allergen_dish.dish.id].push(
              allergen_dish.allergens.name
            );
          }
        });
        
        console.log(this.allergens);
      },
      (error) => {
        Swal.fire('Ooops!', 'Something went wrong.', 'error');
        console.log(error);
      }
    )

  }

  changeCategory(category: string): void {
    this.currentCategory = category;
  }

  deleteDish(dish: any) { //The dish has been removed from the DB. Display accordingly.
    let idx = this.dishes.indexOf(dish);
    this.dishes.splice(idx, 1);
  }
}