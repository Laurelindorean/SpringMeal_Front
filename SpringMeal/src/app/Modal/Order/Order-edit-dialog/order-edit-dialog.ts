import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Order } from 'src/app/Model/Order';
import { DatePipe, NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { ManagementService } from 'src/app/Service/management.service';
import { Slot } from 'src/app/Model/Slot';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-edit-dialog',
  templateUrl: '../Order-edit-dialog/order-edit-dialog.html',
  styleUrls: ['../Order-edit-dialog/order-edit-dialog.css'],
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
    MatDatepickerModule,
    NgFor,
    ReactiveFormsModule,
  ],
})
export class OrderEditDialog implements OnInit {
  form: FormGroup;
  orders?: Order[] = [];
  slots: any[] = [];
  order: Order;
  submitted = false;
  selectedDate: Date;

  constructor(
    public dialogRef: MatDialogRef<OrderEditDialog>,
    private formBuilder: FormBuilder,
    public router: Router,
    private management: ManagementService,
    @Inject(MAT_DIALOG_DATA) public data: Order
  ) {
    this.selectedDate = new Date();
    this.order = data;
    this.form = new FormGroup({
      date: new FormControl(''),
      slot: new FormControl(''),
      user: new FormControl(''),
      idUser: new FormControl('')
    });
    this.management.getAllSlots().subscribe(
      (response) => {
        response.forEach((element: { id: any; start: any; end: any }) => {
          let slot = {
            value: {
              id: element.id,
            },
            viewValue: `${element.start} - ${element.end}`,
          };
          this.slots.push(slot);
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      date: [`${this.order.date}`, Validators.required],
      slot: [
        {
          value: {
            id: `${this.order.slot}`,
          },
          viewValue: `${this.form.value.start} - ${this.form.value.end}`,
        },
        Validators.required,
      ],
      user: [{value:`${this.order.nameUser}`, disabled: true}],
      idUser: [{value:`${this.order.idUser}`, disabled: true}]
    });
  }

  updateOrder() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    let request = {
      date:  new DatePipe('en-US').transform(this.form.value.date, 'YYYY-MM-dd') ,
      slot: {
        id: this.form.value.slot.id
      },
      user: {
        id:  Number(this.form.controls['idUser'].value)
      }
    }

    if(this.order.idOrder==null || this.order.idOrder == undefined){
      throw "error";
    }
    this.management
      .updateOrder(this.order.idOrder, request)
      .subscribe((data) => {
        this.dialogRef.close(this.order.idOrder);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Order updated',
          showConfirmButton: false,
          timer1000
        });
      });
  }
}
