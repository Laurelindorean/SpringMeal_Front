import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { Validation } from '../utils/Validation';
import { UserServiceService } from 'src/app/Service/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  /*
  username!: string;
  password!: string;
  name!: string;
  surname!: string;
  dni!: string;
  email!: string;
*/
  formRegister: FormGroup;
  submitted = false;
  /*
  user!: {
    username: string;
    password: string;
    name: string;
    surname: string;
    dni: string;
    email: string;
  };
*/
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserServiceService,
    public router: Router
  ) {
    this.formRegister = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
      name: new FormControl(''),
      surname: new FormControl(''),
      dni: new FormControl(''),
      email: new FormControl(''),
      acceptTerms: new FormControl(false),
    });
  }

  ngOnInit(): void {
    this.formRegister = this.formBuilder.group({
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
      confirmPassword: ['', [Validators.required]],
      name:[
        '',[
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      surname:[
        '',[
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      dni:[
        '',[
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(9),

        ],
      ],
      email:[
        '',[
          Validators.required,
          Validators.email
        ],
      ],
      acceptTerms:[false, Validators.requiredTrue],
    },
    {
      validators:[Validation.match('password', 'confirmPassword')],
    }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.formRegister.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.formRegister.invalid) {
      return;
    }

    console.log(JSON.stringify(this.formRegister.value, null, 2));
    console.log(this.formRegister.value);
    this.userService.register(this.formRegister.value).subscribe(
      (data) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your registration is complete, now you can log in',
          showConfirmButton: false,
          timer : 1000,
        });
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log(error);
      }
    );
  }


  /*
  register() {

      const user = {
        username: this.username,
        password: this.password,
        name: this.name,
        surname: this.surname,
        dni: this.dni,
        email: this.email,
      };

      this.userService.register(user).subscribe(
        (data) => {
          this.router.navigate(['/login']);
        },
        (error) => {
          console.log(error);
          this.cleanRegisterForm();
        }
      );

  }

  cleanRegisterForm() {
    this.username = '';
    this.password = '';
    this.name = '';
    this.surname = '';
    this.dni = '';
    this.email = '';
  }
  */
}
