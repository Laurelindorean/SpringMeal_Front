import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../Service/user-service.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  editing: boolean = false;

  id!: string; 
  user: any = {
    username: "exemple",
    password: "exemple",
    name: "exemple",
    surname: "exemple",
    dni: "exemple",
    email: "exemple",
  };
  myForm!:FormGroup;

  constructor(private userService: UserServiceService, public router: Router, public fb:FormBuilder) {
    this.id = this.userService.getUserID()


    this.userService.get(this.id).subscribe(
      (data) => {
        this.user = data;
        /*this.myForm=this.fb.group({
          username:[this.user.username, [Validators.required]],
          password:[this.user.password, [Validators.required, Validators.minLength(6)]],
          name:[this.user.name, [Validators.required]],
          surname:[this.user.surname, [Validators.required]],
          dni:[this.user.dni, [Validators.required], Validators.minLength(9), Validators.maxLength(9)],
          email:[this.user.email, [Validators.required, Validators.email]],
        })*/
      },
      (error) => {
        console.log(error);
        this.user = {
          username: "error",
          password: "error",
          name: "error",
          surname: "error",
          dni: "error",
          email: "error",
        };
      }
    )

    
  }

  fillFields() {
    this.userService.get(this.id).subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        console.log(error);
      }
    )
  }
  toggleEditing() {
    if (this.editing) this.save()
    this.editing = !this.editing;
  }

  save() {
    this.userService.update(this.id, this.user).subscribe(
      (data) => {

      },
      (error) => {
        console.log(error);
        this.fillFields();
      }
    );
  }
}
