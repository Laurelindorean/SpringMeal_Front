import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ManagementService } from 'src/app/Service/management.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-allergen',
  templateUrl: './create-allergen.component.html',
  styleUrls: ['./create-allergen.component.css'],
})
export class CreateAllergenComponent implements OnInit {
  form: FormGroup;

  constructor(
    private management: ManagementService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = new FormGroup({
      name: new FormControl(''),
    });
  }
  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
    });
  }

  addAllergen() {
    if (this.form.invalid) {
      this.return;
    }

    let request={
      name: this.form.value.name,
    }
    this.management.addAllergen(request).subscribe(
      (data) =>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Allergen created',
          showConfirmButton: false,
          timer1000
        })
        this.cleanRegisterForm();
      }
    );
  }

  return() {
    this.router.navigateByUrl('/admin/allergen');
  }

  cleanRegisterForm(){
    this.form = new FormGroup({
      name: new FormControl(''),
    });
  }
}
