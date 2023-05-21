import { Component, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/Service/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username!: string;
  password!: string;


  constructor(private userService: UserServiceService, public router: Router) {}

  login() {
    const user = { username: this.username, password: this.password };
    this.userService.login(user).subscribe(
      (data) => {
        this.userService.setToken(data.token);
        this.userService.setRole(data.roleName);
        this.router.navigateByUrl('/welcome');
      },
      (error) => {
        alert('Wrong Username or Password');
      }
    );
  }
}
