import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Model/User';
import { ManagementService } from 'src/app/Service/management.service';
import Swal from 'sweetalert2';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css'],
})
export class AdminUserComponent implements OnInit {
  listUsers: User[] = [];
  displayedColumns: string[] = [
    'id',
    'username',
    'name',
    'surname',
    'dni',
    'email',
    'options',
  ];
  dataSource!: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private management: ManagementService) {
    this.uploadUsers();
  }

  ngOnInit(): void {}

  ngAfterViewInit() {}

  uploadUsers() {
    this.management.getAllUsers().subscribe(
      (data) => {
        this.getData();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  alertConfirmation(idUser?: number) {
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
        if (idUser == null || idUser == undefined) {
          throw 'error';
        }
        this.delete(idUser);

        Swal.fire('Removed!', 'Product removed successfully.');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Product still in our database.)', 'error');
      }
    });
  }

  delete(id: number) {
    this.management.deleteUser(id).subscribe(
      (response) => {
        this.management.getAllUsers().subscribe((data) => {
          this.listUsers = [];
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
              this.listUsers.push(userDTO);
              this.dataSource = new MatTableDataSource(this.listUsers);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            }
          );
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log('filterValue: ' + filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getData() {
    this.management.getAllUsers().subscribe((data) => {
      this.listUsers = [];
      data.forEach((element: any) => {
        let userDTO: User = {
          idUser: element.id,
          username: element.username,
          password: '',
          name: element.name,
          surname: element.surname,
          dni: element.dni,
          email: element.email,
          role: {
            id: element.role.id,
            name: element.role.name,
          },
        };
        this.listUsers.push(userDTO);
        this.dataSource = new MatTableDataSource(this.listUsers);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });
  }

  updateUserUpdated(idUser: number) {
    if (idUser > 0) {
      let userFound: User = this.listUsers.filter(
        (user) => user.idUser == idUser
      )[0];
      this.management.getUserByIdAdmin(idUser).subscribe((response) => {
        userFound.username = response.username;
        userFound.name = response.name;
        userFound.surname = response.surname;
        userFound.dni = response.dni;
        userFound.email = response.email;
      });
    }
  }
}
