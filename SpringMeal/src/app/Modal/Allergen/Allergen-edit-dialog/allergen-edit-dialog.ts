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
import { Allergen } from 'src/app/Model/allergen';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ManagementService } from 'src/app/Service/management.service';
import Swal from 'sweetalert2';

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
    MatDatepickerModule,
    ReactiveFormsModule
  ],
})
export class AllergenEditDialog implements OnInit {
  form: FormGroup;
  allergen: Allergen;
  submitted = false;

  constructor(
    public dialogRef: MatDialogRef<AllergenEditDialog>,
    private formBuilder: FormBuilder,
    public router: Router,
    private management: ManagementService,
    @Inject(MAT_DIALOG_DATA) public data: Allergen
  ) {
    this.allergen=data;
    this.form = new FormGroup({
      name:new FormControl(''),
    });

  }
  updateAllergen(){
    this.submitted = true;
    if(this.form.invalid){
      return;
    }
    if(this.allergen.idAllergen == null || this.allergen.idAllergen== undefined){
      throw "error";
    }
    this.management.updateAllergen(this.allergen.idAllergen, this.form.value).subscribe(
      (data)=>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Allergen updated',
          showConfirmButton: false,
          timer: 1500
        });
        this.dialogRef.close(this.allergen.idAllergen);
      }
    )
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name:[`${this.allergen.name}`, Validators.required],
    });
  }
}
