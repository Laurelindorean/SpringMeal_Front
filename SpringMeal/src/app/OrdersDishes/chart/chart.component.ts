import { Component, Input } from '@angular/core';
import { UtilsService } from 'src/app/Service/utils.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {

  @Input() dishes! : any[] 
  
  constructor(public utils : UtilsService) {

  }

  totalPrice() {
    if (this.dishes == undefined) return 0;
    let sum = 0.0
    for (const dish of this.dishes) {
      if (dish.chart) {
        sum += dish.price;
      }
    }
    return sum;
  }
}
