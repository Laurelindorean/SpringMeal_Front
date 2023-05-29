import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { ManagementService } from 'src/app/Service/management.service';
import { UtilsService } from 'src/app/Service/utils.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-dish',
  templateUrl: './create-dish.component.html',
  styleUrls: ['./create-dish.component.css'],
})
export class CreateDishComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  categories! : any[];
  image : string = "";
  allergens! : any[];

  constructor(
    private management: ManagementService,
    private fb: FormBuilder,
    private router: Router,
    public utils : UtilsService
  ) {
    this.form = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      price: new FormControl(''),
      image: new FormControl(''),
      category: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.management.getAllCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.log(error);
      }
    )
    this.form = this.fb.group({
      name: [
        '',
        [
          Validators.required,
        ],
      ],
      description: [
        '',
        [
          Validators.maxLength(200),
        ],
      ],
      price: [
        '',
        [
          Validators.required,
          Validators.min(0),
        ],
      ],
      category: ['', Validators.required],
    });
  }

  addDish() {
    console.log(this.form);
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    let dish = this.form.value;
    dish.image = this.image;
    this.management.addDish(dish).subscribe((data) => {
      console.log(data);
      dish = data;
      for (let allergen of this.allergens) {
        if (allergen.diff === 1) {
          console.log(allergen);
          
          this.management.addDishAllergen({
            allergens : {id : allergen.id},
            dish : {id : dish.id}
          }).subscribe(
            (data) => {console.log("ok"); console.log(data);},
            (error) => {console.log(error);}
          )
        }        
      }
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Dish created',
        showConfirmButton: false,
        timer1000
      })
    });
  }

  return() {
    this.router.navigateByUrl('/admin/dish');
  }

  onFileSelected(event:any) {
    this.convertFile(event.target.files[0]).subscribe(base64 => {
      this.image = base64;
    });
  }

  convertFile(file : File) : Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event:any) => result.next(btoa(event.target.result.toString()));
    return result;
  }

  onAllergensChange(allergens : any[]) {
    console.log(allergens);
    this.allergens = allergens;
    
  }
}