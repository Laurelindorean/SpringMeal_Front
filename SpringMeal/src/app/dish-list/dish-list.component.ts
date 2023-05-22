import { Component } from '@angular/core';

@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css']
})
export class DishListComponent {
  dishes: any[] = [
    {
      name: 'Plat 1',
      description: 'Descripció del plat 1',
      image: '../../../img/sample.dish',
      price: 10.99
    },
    {
      name: 'Plat 2',
      description: 'Descripció del plat 2',
      image: '../../../img/sample.dish',
      price: 12.99
    },
    // Afegir més plats aquí...
  ];

  return() {
    // Funció per tornar enrere
  }
}