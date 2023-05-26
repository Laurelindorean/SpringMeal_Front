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
  selector: 'app-allergen-edit-dialog',
  templateUrl: '../Allergen-edit-dialog/allergen-edit-dialog.html',
  styleUrls: ['../Allergen-edit-dialog/allergen-edit-dialog.css'],
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
    MatDatepickerModule
  ],
})

export class AllergenEditDialog{
  constructor(public dialogRef: MatDialogRef<AllergenEditDialog>) {}
}
