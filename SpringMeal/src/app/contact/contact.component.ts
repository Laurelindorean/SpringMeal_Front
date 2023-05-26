import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  constructor(private router:Router){}

  return() {
    this.router.navigateByUrl('/welcome');
  }
  send(){
        Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Thank you! we will contact you as soon as possible',
      showConfirmButton: false,
      timer: 1500
    })
  }

}
