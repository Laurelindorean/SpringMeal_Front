import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/Model/Category';
import { ManagementService } from 'src/app/Service/management.service';
import Swal from 'sweetalert2';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css'],
})
export class AdminCategoryComponent implements OnInit {
  listCategory: Category[] = [];
  displayedColumns: string[] = ['id', 'name', 'options'];
  dataSource!: MatTableDataSource<Category>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private management: ManagementService) {
    this.uploadOrders();
  }

  ngOnInit(): void {}

  ngAfterViewInit() {}

  uploadOrders() {
    this.management.getAllCategories().subscribe(
      (data) => {
        data.forEach((categoryJson: any) => {
          let categoryDTO: Category = {
            idCategory: categoryJson.id,
            name: categoryJson.name,
          };
          this.listCategory.push(categoryDTO);
          this.getData();
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
        if (id == null || id == undefined) {
          throw 'error';
        }
        this.delete(id);

        Swal.fire('Removed!', 'Product removed successfully.');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Product still in our database.)', 'error');
      }
    });
  }

  delete(id: number) {
    this.management.deleteCategory(id).subscribe(
      (response) => {
        this.management.getAllCategories().subscribe((data) => {
          this.listCategory = [];
          data.forEach((element: { id: any; name: string }) => {
            let categoryDTO: Category = {
              idCategory: element.id,
              name: element.name,
            };
            this.listCategory.push(categoryDTO);
            this.getData();
          });
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log('filterValue: ' + filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getData() {
    this.dataSource = new MatTableDataSource(this.listCategory);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  updateCategoryUpdated(idCategory: number) {
    if (idCategory > 0) {
      let categoryFound: Category = this.listCategory.filter(
        (category) => category.idCategory == idCategory
      )[0];
      this.management.getCategoryById(idCategory).subscribe((response) => {
        categoryFound.name = response.name;
      });
    }
  }
}
