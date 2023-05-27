import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Category } from 'src/app/Model/Category';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ManagementService } from 'src/app/Service/management.service';
import Swal from 'sweetalert2';

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
    ReactiveFormsModule,
  ],
})
export class CategoryEditDialog implements OnInit {
  form: FormGroup;
  category: Category;
  submitted = false;

  constructor(
    public dialogRef: MatDialogRef<CategoryEditDialog>,
    private formBuilder: FormBuilder,
    public router: Router,
    private management: ManagementService,
    @Inject(MAT_DIALOG_DATA) public data: Category
  ) {
    this.category = data;
    this.form = new FormGroup({
      name: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [`${this.category.name}`, Validators.required],
    });
  }

  updateCategory() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    if (
      this.category.idCategory == null ||
      this.category.idCategory == undefined
    ) {
      throw 'error';
    }
    this.management
      .updateCategory(this.category.idCategory, this.form.value)
      .subscribe(
        (data) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Category updated',
            showConfirmButton: false,
            timer: 1500
          });
          this.dialogRef.close(this.category.idCategory);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
