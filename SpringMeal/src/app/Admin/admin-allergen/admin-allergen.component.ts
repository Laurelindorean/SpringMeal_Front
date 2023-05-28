import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Allergen } from 'src/app/Model/allergen';
import { ManagementService } from 'src/app/Service/management.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-allergen',
  templateUrl: './admin-allergen.component.html',
  styleUrls: ['./admin-allergen.component.css'],
})
export class AdminAllergenComponent implements OnInit {
  listAllergens: Allergen[] = [];
  displayedColumns: string[] = ['id', 'name', 'options'];
  dataSource!: MatTableDataSource<Allergen>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private management: ManagementService) {
    this.uploadAllergens();
  }

  ngOnInit(): void {}

  ngAfterViewInit() {}

  uploadAllergens() {
    this.management.getAllAllergens().subscribe(
      (data) => {
        this.getData();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  alertConfirmation(idAllergen?: number) {
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
        if (idAllergen == null || idAllergen == undefined) {
          throw 'error';
        }
        this.delete(idAllergen);

        Swal.fire('Removed!', 'Product removed successfully.');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Product still in our database.)', 'error');
      }
    });
  }

  delete(id: number) {
    this.management.deleteAllergen(id).subscribe(
      (response) => {
        this.getData();
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

  updateAllergenUpdated(idAllergen: number) {
    if (idAllergen > 0) {
      let allergenFound: Allergen = this.listAllergens.filter(
        (allergen) => allergen.idAllergen == idAllergen
      )[0];
      this.management.getAllergenById(idAllergen).subscribe((response) => {
        allergenFound.name = response.name;
      });
    }
  }

  getData() {
    this.management.getAllAllergens().subscribe((data) => {
      this.listAllergens = [];
      data.forEach((element: { id: any; name: string }) => {
        let allergenDTO: Allergen = {
          idAllergen: element.id,
          name: element.name,
        };
        this.listAllergens?.push(allergenDTO);
        this.dataSource = new MatTableDataSource(this.listAllergens);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });
  }
}
