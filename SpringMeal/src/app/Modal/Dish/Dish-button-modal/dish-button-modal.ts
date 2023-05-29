import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Dish } from 'src/app/Model/Dish';
import { DishDialogModal } from '../Dish-dialog-modal/dish-dialog-modal';

@Component({
selector:'app-dish-button-modal',
templateUrl: '../Dish-button-modal/dish-button-modal.html',
styleUrls:['../Dish-button-modal/dish-button-modal.css'],
standalone: true,
imports: [MatButtonModule, MatDialogModule, MatIconModule],
})


export class DishButtonModal{
  @Input() dish!: Dish;

  constructor(public dialog: MatDialog) {}

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    const dialogRef = this.dialog.open(DishDialogModal, {
      width: '50%',
      autoFocus: true,
      maxWidth: '90vh',
      maxHeight: '90vh',
      hasBackdrop: true, // background shadow
      enterAnimationDuration,
      exitAnimationDuration,
      data: this.dish,
    });

  }

}
