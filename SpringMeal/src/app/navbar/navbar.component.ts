import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  title:string="Springmeal";

  constructor(private cookie:CookieService, private router:Router){

  }

  isAdmin(){
    return this.cookie.get('roleName') == 'ROLE_admin';
  }

  logOut(){
    this.cookie.delete('token');
    this.router.navigateByUrl('/login');

  }
}


