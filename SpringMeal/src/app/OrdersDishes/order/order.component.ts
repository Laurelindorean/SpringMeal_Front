



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
import {MatDatepickerModule} from '@angular/material/datepicker';
import { UserServiceService } from 'src/app/Service/user-service.service';
import { UtilsService } from 'src/app/Service/utils.service';
//import '@angular/compiler'

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  form: FormGroup;
  //slots: any[] = [];
  dishes : any[] = [];
  slots : any[] = [];


  constructor(
    private management: ManagementService,
    private fb: FormBuilder,
    private router: Router,
    private userService : UserServiceService,
    private utils : UtilsService
  ) {
    this.form = new FormGroup({
      date: new FormControl(''),
      slot: new FormControl(''),
      user: new FormControl(''),
    });
  }



  ngOnInit(): void {
    this.management.getAllDishes().subscribe(
      (data) => {
        this.dishes = data;
        this.dishes.forEach(dishs => {
          dishs.chart = false;
        })
        console.log(this.dishes);
      },
      (error) => {
        console.log(error);
      }
    );


    this.form = this.fb.group({
      date: ['', [Validators.required]],
      slot: ['', Validators.required]
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

  validOrder() {
    if (this.form.invalid) return false;
    for (const dish of this.dishes) {
      if (dish.chart) return true;
    }
    return false;
  }

  addOrder() {
    if (!this.validOrder()) {
      return;
    }

    let request = {
      date:  new DatePipe('en-US').transform(this.form.value.date, 'YYYY-MM-dd') ,
      slot: {
        id: this.form.value.slot.id
      },
      user: {
        id: Number(this.userService.getUserID())
      }
    }
    console.log(request);
    this.management.addOrder(request).subscribe(
      (data) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Order created',
          showConfirmButton: false,
          timer1000
        })
        this.router.navigateByUrl('/welcome')
        
      },
      (error) => {
        console.log(error);
      }
    );
  }
}



