import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalComponent } from 'src/app/Modal/modal/modal.component';
import { User } from 'src/app/Model/User';
import { ManagementService } from 'src/app/Service/management.service';


@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css'],
})
export class AdminUserComponent implements OnInit {

  users?: User[] = [];

  constructor(private management: ManagementService, private router: Router) {}

  ngOnInit(): void {
    this.management.getAllUsers().subscribe(
      (data): void => {
        data.forEach((userJson: any) => {
          let userDTO : User = {
            idUser: userJson.id,
            username: userJson.username,
            password: "",
            name: userJson.name,
            surname: userJson.surname,
            dni: userJson.dni,
            email: userJson.email,

          }

          this.users?.push(userDTO);
        });
      },
      (error) => {
        console.log(error);
      }
    );


  }

  return() {
    this.router.navigateByUrl('/welcome');
  }

  miMetodoTest() {
    console.log('Mi Metodo test');
    console.log();
  }
}
