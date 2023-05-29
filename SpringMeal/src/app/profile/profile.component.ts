import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../Service/user-service.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UtilsService } from '../Service/utils.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  editing: boolean = false;
  submitted = false;
  id!: string; 
  user! : any;
  //form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserServiceService,
    public router: Router,
    private utils : UtilsService
  ) {
    /*this.form = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
      name: new FormControl(''),
      surname: new FormControl(''),
      dni: new FormControl(''),
      email: new FormControl(''),
      acceptTerms: new FormControl(false),
    });*/
  }

  ngOnInit(): void {
    this.id = this.userService.getUserID()
    this.fillFields()
    /*this.form = this.formBuilder.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
      surname:[
        '',[
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      dni:[
        '',[
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(9),

        ],
      ],
      email:[
        '',[
          Validators.required,
          Validators.email
        ],
      ]
    }
    );*/
  }



  fillFields() {
    this.userService.get(this.id).subscribe(
      (data) => {
        this.user = data;
        //this.form = data;
      },
      (error) => {
        console.log(error);
      }
    )
  }
  toggleEditing() {
    if (this.editing) this.save()
    this.editing = !this.editing;
  }

  save() {
    this.userService.update(this.id, this.user).subscribe(
      (data) => {

      },
      (error) => {
        console.log(error);
        this.fillFields();
      }
    );
  }

  return() {
    this.router.navigateByUrl('/welcome');
  }
}
