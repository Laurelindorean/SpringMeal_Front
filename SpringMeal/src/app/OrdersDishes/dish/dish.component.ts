import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UtilsService } from '../../Service/utils.service';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css']
})


export class DishComponent {

  @Input() dish: any;
  @Input() allergens : Record<number,any[]> = {}
  @Input() actions: any;


  constructor(public utils : UtilsService)  {}

  addToChart() {
    this.dish.chart = true;
    console.log(this.dish);
  }

  removeFromChart() {
    this.dish.chart = false;
    console.log(this.dish);
  }
}
