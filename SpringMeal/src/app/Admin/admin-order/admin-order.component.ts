import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Order } from 'src/app/Model/Order';
import { ManagementService } from 'src/app/Service/management.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css'],
})
export class AdminOrderComponent implements OnInit{
  orders: Order[] = [];
  public p?:number;


  constructor(private router: Router, private management: ManagementService) {}



  ngOnInit(): void {
    this.uploadOrders();
  }

  uploadOrders() {
    this.management.getAllOrders().subscribe(
      (data) => {
        data.forEach((orderJson: any) => {
          let orderDTO: Order = {
            idOrder: orderJson.id,
            date: new Date(orderJson.date).toLocaleDateString(),
            slot: `${orderJson.slot.start} - ${orderJson.slot.end}`,
            idUser: orderJson.user.id,
            nameUser: orderJson.user.name
          };
          this.orders?.push(orderDTO);
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  delete(id: number) {
    this.management.deleteOrder(id).subscribe(
      (response) => {
        this.management.getAllOrders().subscribe((data) => {
          this.orders = [];

          data.forEach(
            (element: {
              id: any;
              date: string | number | Date;
              slot: { start: any, end: any };
              user: { name: any };
            }) => {
              let orderDTO: Order = {
                idOrder: element.id,
                date: new Date(element.date).toLocaleDateString(),
                slot: `${element.slot.start} - ${element.slot.end}`,
                idUser: element.user.name,
              };
              this.orders?.push(orderDTO);
            }
          );
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  alertConfirmation(idOrder?: number) {
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
        if(idOrder==null || idOrder==undefined){
          throw "error";
        }
        this.delete(idOrder);
        Swal.fire('Removed!', 'Product removed successfully.');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Product still in our database.)', 'error');
      }
    });
  }


  return() {
    this.router.navigateByUrl('/welcome');
  }

  updateOrderUpdated(idOrder: number){
    if(idOrder > 0){
      let orderFound : Order = this.orders.filter(order => order.idOrder == idOrder)[0];
      this.management.getOrderById(idOrder).subscribe( response => {
        orderFound.date = new Date(response.date).toLocaleDateString();
        orderFound.slot = `${response.slot.start} - ${response.slot.end}`;
      });
    }
  }
}
