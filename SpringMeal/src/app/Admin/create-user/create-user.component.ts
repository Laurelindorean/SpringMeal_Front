import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ManagementService } from 'src/app/Service/management.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(
    private management: ManagementService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
      name: new FormControl(''),
      surname: new FormControl(''),
      dni: new FormControl(''),
      email: new FormControl(''),
      role: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(40),
        ],
      ],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      surname: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      dni: [
        '',
        [Validators.required, Validators.minLength(9), Validators.maxLength(9)],
      ],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
    });
  }


  addUser() {
    console.log(this.form);
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.management.addUser(this.form.value).subscribe((data) => {
      console.log(data);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'User created',
        showConfirmButton: false,
        timer: 1500
      })
      this.cleanRegisterForm();
    });
  }

  roles: any[] = [
    { value: {
      id:'1'}, viewValue: 'Admin' },
    { value:{
      id:'2'
    }, viewValue: 'User' },
  ];

  return() {
    this.router.navigateByUrl('/admin/user');
  }

  cleanRegisterForm() {
    this.form = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
      name: new FormControl(''),
      surname: new FormControl(''),
      dni: new FormControl(''),
      email: new FormControl(''),
      role: new FormControl(''),
    });
  }

}
