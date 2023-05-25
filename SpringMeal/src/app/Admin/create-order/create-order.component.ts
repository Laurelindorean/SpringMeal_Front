import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from 'src/app/Model/Order';
import { ManagementService } from 'src/app/Service/management.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css'],
})
export class CreateOrderComponent implements OnInit {
  form: FormGroup;
  orders?: Order[] = [];
  slots: any[] = [];

  constructor(
    private management: ManagementService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = new FormGroup({
      date: new FormControl(''),
      slot: new FormControl(''),
      user: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      date: ['', [Validators.required]],
      slot: ['', Validators.required],
      user: ['', Validators.required],
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

  addOrder() {
    if (this.form.invalid) {
      this.return;
    }

    console.log(this.form.value);
    let request = {
      date: new DatePipe('en-US').transform(this.form.value.date, 'YYYY-MM-dd'),
      slot: {
        id: this.form.value.slot.id,
      },
      user: {
        id: Number(this.form.value.user),
      },
    };
    console.log(request);
    this.management.addOrder(request).subscribe((data) => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Order created',
        showConfirmButton: false,
        timer: 1500,
      });
      this.cleanRegisterForm();
    });
  }

  return() {
    this.router.navigateByUrl('/admin/order');
  }

  cleanRegisterForm() {
    this.form = new FormGroup({
      date: new FormControl(''),
      slot: new FormControl(''),
      user: new FormControl(''),
    });
  }
}
