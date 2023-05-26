import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/Service/user-service.service';
import Swal from 'sweetalert2';

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
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Welcome to SpringMeal',
          showConfirmButton: false,
          timer: 1000,
        });
        this.userService.setToken(data.token);
        this.userService.setRole(data.roleName);
        this.userService.setUserID(data.userid);
        this.router.navigateByUrl('/welcome');
      },
      (error) => {
        alert('Wrong Username or Password');
      }
    );
  }
}
