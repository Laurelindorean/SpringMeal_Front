import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Model/User';
import { ManagementService } from 'src/app/Service/management.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { UserServiceService } from 'src/app/Service/user-service.service';
import { NgFor } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    ReactiveFormsModule,
    NgFor,

  ],
})
export class EditUserComponent implements OnInit {
  form: FormGroup;
  id!: number;
  users?: User[] = [];
  user: User;
  roles: any[] = [];
  submitted = false;

  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>,
    private formBuilder: FormBuilder,
    public router: Router,
    private management: ManagementService,
    private userService: UserServiceService,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
    this.user = data;
    this.form = new FormGroup({
      username: new FormControl(``),
      name: new FormControl(``),
      surname: new FormControl(``),
      dni: new FormControl(``),
      email: new FormControl(``),
      role: new FormControl(``),
    });
    this.management.getAllRoles().subscribe(
      (response) => {
        response.forEach((element: { id: any; name: any }) => {
          let role = {
            value: {
              id: element.id,
            },
            viewValue: element.name,
          };
          this.roles.push(role);
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateUser() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.management
      .updateUserByAdmin(this.user.idUser, this.form.value)
      .subscribe((data) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'User updated',
          showConfirmButton: false,
          timer1000
        });
        this.dialogRef.close(this.user.idUser);
      });
  }

  ngOnInit(): void {
    console.log(this.user);
    this.form = this.formBuilder.group({
      username: [`${this.user.username}`, Validators.required],
      name: [`${this.user.name}`, Validators.required],
      surname: [`${this.user.surname}`, Validators.required],
      dni: [
        `${this.user.dni}`,
        [Validators.required, Validators.maxLength(9), Validators.minLength(9)],
      ],
      email: [`${this.user.email}`, [Validators.required, Validators.email]],
      role: [
        {
          value: {
            id: `${this.user.role?.id}`,
          },
          viewValue: `${this.user.role?.name}`,
        },
        Validators.required,
      ],
    });
  }
}
