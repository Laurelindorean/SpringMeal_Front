import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { ManagementService } from 'src/app/Service/management.service';
import { UtilsService } from 'src/app/Service/utils.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dish-edit-dialog',
  templateUrl: './dish-edit-dialog.component.html',
  styleUrls: ['./dish-edit-dialog.component.css'],
})
export class DishEditDialog implements OnInit {
  form: FormGroup;
  submitted = false;
  categories! : any[];
  image : string = "";
  dish : any;

  constructor(
    public utils : UtilsService,
    public dialogRef: MatDialogRef<DishEditDialog>,
    private formBuilder: FormBuilder,
    public router: Router,
    private management: ManagementService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dish = data;
    this.form = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      price: new FormControl(''),
      image: new FormControl(''),
      category: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.management.getAllCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.log(error);
      }
    )
    this.form = this.formBuilder.group({
      name: [
        this.dish.name,
        [
          Validators.required,
        ],
      ],
      description: [
        this.dish.description,
        [
          Validators.maxLength(200),
        ],
      ],
      price: [
        this.dish.price,
        [
          Validators.required,
          Validators.min(0),
        ],
      ],
      category: [
        this.dish.category.id, 
        Validators.required
      ],
    });
  }

  addDish() {
    
  }

  updateDish() {
    console.log(this.form);
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.dish.name = this.form.value.name;
    this.dish.price = +this.form.value.price;
    this.dish.category =  this.categories.find((x) => x.id === this.form.value.category);
    this.dish.description = this.form.value.description;
    if (this.image != "") {
      this.dish.image = this.image;
    }
    console.log(this.categories);
    console.log("this.val.cat:");
    
    console.log(this.dish.category);
    
    this.dialogRef.close();

    this.management.updateDishes(this.dish.id, this.dish).subscribe((data) => {
      console.log(data);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Dish updated',
        showConfirmButton: false,
        timer: 1500
      })
    });
  }

  return() {
    this.router.navigateByUrl('/admin/dish');
  }

  onFileSelected(event:any) {
    this.convertFile(event.target.files[0]).subscribe(base64 => {
      this.image = base64;
    });
  }

  convertFile(file : File) : Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event:any) => result.next(btoa(event.target.result.toString()));
    return result;
  }
}