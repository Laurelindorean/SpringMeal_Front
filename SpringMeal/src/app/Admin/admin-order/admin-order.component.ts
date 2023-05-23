import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/Model/Order';
import { ManagementService } from 'src/app/Service/management.service';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css'],
})
export class AdminOrderComponent implements OnInit {
  orders?: Order[] = [];

  constructor(private router: Router, private management: ManagementService) {}
  ngOnInit(): void {
    this.management.getAllOrders().subscribe(
      (data) => {
        data.forEach((orderJson: any) => {
          let orderDTO: Order = {
            idOrder: orderJson.id,
            date: new Date(orderJson.date).toLocaleDateString(),
            slot: orderJson.slot.start,
            idUser: orderJson.user.name,
          };
          this.orders?.push(orderDTO);
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
}
