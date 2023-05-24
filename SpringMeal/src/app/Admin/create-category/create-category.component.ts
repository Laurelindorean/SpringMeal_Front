import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ManagementService } from 'src/app/Service/management.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent {
  tiles: any[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

  category={

    name:'',
  };
  isCategoryAdded = false;

  constructor(private management:ManagementService, private router:Router){}

  addCategory():void{
    const data= {
      name:this.category.name
    };
    if(!data.name){
      alert('Please add a name');
      return;
    }
    this.management.addCategory(data).subscribe(
      (response)=>{

        this.isCategoryAdded = true;
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  newCategory():void{
    this.isCategoryAdded = false;
    this.category ={
      name: '',
    };
  }



}
