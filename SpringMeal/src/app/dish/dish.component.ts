import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UtilsService } from '../Service/utils.service';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css']
})


export class DishComponent {

  @Input() dish: any;
  @Input() actions: any;
  @Output() addToChart = new EventEmitter();

  constructor(public utils : UtilsService)  {}

  emit_addToChart() {
    this.addToChart.emit(this.dish);
  }
}
