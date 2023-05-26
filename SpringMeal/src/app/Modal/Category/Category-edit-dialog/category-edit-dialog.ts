import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-category-edit-dialog',
  templateUrl: '../Category-edit-dialog/category-edit-dialog.html',
  styleUrls: ['../Category-edit-dialog/category-edit-dialog.css'],
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
  ],
})
export class CategoryEditDialog {
  constructor(public dialogRef: MatDialogRef<CategoryEditDialog>) {}
}
