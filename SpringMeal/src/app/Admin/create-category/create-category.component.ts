import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ManagementService } from 'src/app/Service/management.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit{
  form: FormGroup;

  constructor(private management:ManagementService, private router:Router, private fb: FormBuilder){
    this.form = new FormGroup({
      name: new FormControl(''),
    });
  }
  ngOnInit(): void {
    this.form= this.fb.group({
      name: ['', Validators.required],
    })
  }

  addCategory(){
    if (this.form.invalid) {
      this.return;
    }
    let request={
      name: this.form.value.name,
    }
    this.management.addCategory(request).subscribe(
      (data)=>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Category created',
          showConfirmButton: false,
          timer : 1000
        })
        this.cleanRegisterForm();
      }
    );
  }

  return() {
    this.router.navigateByUrl('/admin/category');
  }
  cleanRegisterForm(){
    this.form = new FormGroup({
      name: new FormControl(''),
    });
  }
}
