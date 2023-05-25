import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/Model/Category';
import { ManagementService } from 'src/app/Service/management.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css'],
})
export class AdminCategoryComponent implements OnInit {
  categories?: Category[] = [];

  constructor(private router: Router, private management: ManagementService) {}
  ngOnInit(): void {
    this.uploadCategories();
  }

  uploadCategories(){
    this.management.getAllCategories().subscribe(
      (data) => {
        data.forEach((categoryJson: any) => {
          let categoryDTO: Category = {
            idCategory: categoryJson.id,
            name: categoryJson.name,
          };
          this.categories?.push(categoryDTO);
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  delete(id: number) {
    this.management.deleteCategory(id).subscribe(
      (response) => {
        this.management.getAllCategories().subscribe((data) => {
          this.categories = [];
          data.forEach((element: {id: any; name: string}) => {
              let categoryDTO: Category = {
                idCategory: element.id,
                name: element.name,
              };
              this.categories?.push(categoryDTO);
            }
          );
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  alertConfirmation(id?: number) {
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
        if(id == null || id == undefined){
          throw 'error';
        }
        this.delete(id);
        Swal.fire('Removed!', 'Product removed successfully.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Product still in our database.)', 'error');
      }
    });
  }

  return() {
    this.router.navigateByUrl('/welcome');
  }


}
