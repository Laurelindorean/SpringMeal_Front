import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit{
  form: FormGroup;
  email?: string;
  message?: string;
  constructor(private router: Router, private fb: FormBuilder) {
    this.form = new FormGroup({
      email: new FormControl(''),
      message: new FormControl(''),
    });
  }
  ngOnInit(): void {
    this.form = this.fb.group({
      email:['', [Validators.required,
      Validators.email]],
      message:['', Validators.required]
    })
  }

  return() {
    this.router.navigateByUrl('/welcome');
  }
  send() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Thank you! we will contact you as soon as possible',
      showConfirmButton: false,
      timer : 1000,
    });
    this.cleanRegisterForm();
  }
  cleanRegisterForm(){
    this.form = new FormGroup({
      email: new FormControl(''),
      message: new FormControl(''),
    });
  }
}
