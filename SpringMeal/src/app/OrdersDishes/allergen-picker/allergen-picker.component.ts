import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ManagementService } from 'src/app/Service/management.service';
import { UtilsService } from 'src/app/Service/utils.service';

@Component({
  selector: 'app-allergen-picker',
  templateUrl: './allergen-picker.component.html',
  styleUrls: ['./allergen-picker.component.css']
})
export class AllergenPickerComponent implements OnInit {
  @Input() dish_id? : number;
  @Output() onChange : EventEmitter<any[]> = new EventEmitter();
  allergen2allergendish : Record<number,number> = {}; // id_allergen -> id_allergen_dish
  allergens :any[] = [];
  

  
  constructor(private management : ManagementService) {}

  

  ngOnInit(): void {

    this.management.getAllAllergens().subscribe(
      (data) => {
        this.allergens = [];
        data.forEach((allergen : any) => {
          allergen.active = false;
          allergen.diff = 0;
          this.allergens.push(allergen);
        })
        if (this.dish_id === undefined) {
          this.onChange.emit(this.allergens);
        }
        else {
          this.management.getDishAllergenByDish(this.dish_id).subscribe(
            (data) => {
              console.log(data);
              
              data.forEach((allergendish : any) => {
                let allergen = this.allergens.find((a) => (a.id === allergendish.allergens.id));
                allergen.active = true;
                allergen.allergendishid = allergendish.id;
                
              })
              this.onChange.emit(this.allergens);
            }, 
            (error) => {console.log(error);}
          )
        }
        
      },
      (error) => {
        console.log(error);
      }
    )
    
  }

  toggle(allergen:any) {
    allergen.active = !allergen.active;
    if (allergen.active) allergen.diff += 1;
    else allergen.diff -= 1;

    this.onChange.emit(this.allergens);
    
  }
  

}
