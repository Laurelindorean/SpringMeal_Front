import { Component, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { UserServiceService } from 'src/app/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username!: string;
  password!: string;

  constructor(private userService: UserServiceService, public router:Router) {}

  login() {
    console.log(this.username);
    console.log(this.password);
    const user = { username: this.username, password: this.password };
    this.userService.login(user).subscribe((data) => {
      this.userService.setToken(data.token);
      this.router.navigateByUrl("/welcome");
      console.log(data);
    },
    error =>{
      alert("Wrong Username or Password");
      console.log(error);
    });
    // ---- DELETE THIS -----------
    //this.userService.setUserID(this.username);
    this.router.navigateByUrl("/profile");
    // -----------------------
  }

}
