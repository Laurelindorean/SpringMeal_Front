import { Component, OnInit } from '@angular/core';
import { ManagementService } from 'src/app/Service/management.service';
import { UtilsService } from 'src/app/Service/utils.service';


@Component({
  selector: 'app-admin-dish',
  templateUrl: './admin-dish.component.html',
  styleUrls: ['./admin-dish.component.css']
})


export class AdminDishComponent implements OnInit {
  dishes : any[] = [];


  constructor(private management: ManagementService) {}

  ngOnInit(): void {
    this.management.getAllDishes().subscribe(
      (data) => {
        console.log(data);
        this.dishes = data;
        console.log(this.dishes);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}