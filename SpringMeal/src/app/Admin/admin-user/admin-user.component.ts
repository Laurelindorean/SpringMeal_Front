import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Model/User';
import { ManagementService } from 'src/app/Service/management.service';
import Swal from 'sweetalert2';

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
      (data) => {
        data.forEach((userJson: any) => {
          let userDTO: User = {
            idUser: userJson.id,
            username: userJson.username,
            password: '',
            name: userJson.name,
            surname: userJson.surname,
            dni: userJson.dni,
            email: userJson.email,
          };

          this.users?.push(userDTO);
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  delete(id: number) {
    this.management.deleteUser(id).subscribe(
      (response) => {
        this.management.getAllUsers().subscribe((data) => {
          this.users = [];
          data.forEach(
            (element: {
              id: any;
              username: string;
              name: string;
              surname: string;
              dni: string;
              email: string;
            }) => {
              let userDTO: User = {
                idUser: element.id,
                username: element.username,
                password: '',
                name: element.name,
                surname: element.surname,
                dni: element.dni,
                email: element.email,
              };
              this.users?.push(userDTO);
            }
          );
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
  alertConfirmation(idUser: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This process is irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      confirmButtonColor: '#e20074',
      cancelButtonText: 'No, let me think',
    }).then((result) => {
      if (result.value) {
        this.delete(idUser);
        Swal.fire('Removed!', 'Product removed successfully.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Product still in our database.)', 'error');
      }
    });
  }

  return() {
    this.router.navigateByUrl('/welcome');
  }
}
