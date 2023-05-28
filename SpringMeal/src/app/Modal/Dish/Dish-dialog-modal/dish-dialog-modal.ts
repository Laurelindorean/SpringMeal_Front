import { Dish } from 'src/app/Model/Dish';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import {MatListModule} from '@angular/material/list';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ManagementService } from 'src/app/Service/management.service';
import { NgFor, NgIf } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-dish-dialog-modal',
  templateUrl: '../Dish-dialog-modal/dish-dialog-modal.html',
  styleUrls: ['../Dish-dialog-modal/dish-dialog-modal.css'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatListModule,
    NgFor,
    NgIf,
    MatTableModule
  ],
})
export class DishDialogModal implements OnInit {



  idOrder: number;
  displayedColumns: string[] = ['id', 'name', 'description', 'price'];
  dishes: Dish[] = [];
  dataSource!: MatTableDataSource<Dish>;

  constructor(
    public dialogRef: MatDialogRef<DishDialogModal>,
    public router: Router,
    private management: ManagementService,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {
    this.idOrder = data;
    this.getDishes(this.idOrder);
  }

  ngOnInit(): void {}

  getDishes(idOrder:number){
    this.management.getOrderDishByOrder(idOrder).subscribe(
      (data)=>{
        data.forEach((dataDish: { id: any; name: any; description: any; price: any; }) => {
          let dish: Dish = {
            idDish: dataDish.id,
            name: dataDish.name,
            description: dataDish.description,
            price: dataDish.price
          };
          this.dishes.push(dish);
        });
        if(this.dishes.length > 0 ){
          this.dataSource = new MatTableDataSource(this.dishes);
         }
      },
      (error) => {
        console.log(error);
      }

    )};

}
