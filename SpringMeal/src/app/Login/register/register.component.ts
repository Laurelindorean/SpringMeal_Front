import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/user-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit{
  username!: string;
  password!: string;
  name!: string;
  surname!: string;
  dni!: string;
  email!: string;
  myForm!:FormGroup;

  constructor(private userService: UserServiceService, public router: Router, public fb:FormBuilder) {
    this.myForm=this.fb.group({
      username:['', [Validators.required]],
      password:['', [Validators.required, Validators.minLength(6)]],
      name:['', [Validators.required]],
      surname:['', [Validators.required]],
      dni:['', [Validators.required], Validators.minLength(9), Validators.maxLength(9)],
      email:['', [Validators.required, Validators.email]],


    })
  }
  ngOnInit(): void {
  }
  saveData(){
    console.log(this.myForm.value)
  }

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
}
