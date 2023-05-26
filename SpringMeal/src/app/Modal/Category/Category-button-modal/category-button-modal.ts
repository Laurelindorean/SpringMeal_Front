import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CategoryEditDialog } from '../Category-edit-dialog/category-edit-dialog';

@Component({
  selector: 'app-category-button-modal',
  templateUrl: '../Category-button-modal/category-button-modal.html',
  styleUrls: ['../Category-button-modal/category-button-modal.css'],
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatIconModule],
})
export class CategoryButtonModal {
  constructor(public dialog: MatDialog) {}
  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(CategoryEditDialog, {
      width: '50%',
      autoFocus: true,
      maxWidth: '90vh',
      maxHeight: '90vh',
      hasBackdrop: true, // background shadow
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
