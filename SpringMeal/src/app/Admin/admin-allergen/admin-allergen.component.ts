import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Allergen } from 'src/app/Model/allergen';
import { ManagementService } from 'src/app/Service/management.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-allergen',
  templateUrl: './admin-allergen.component.html',
  styleUrls: ['./admin-allergen.component.css'],
})
export class AdminAllergenComponent implements OnInit {
  allergens: Allergen[] = [];
  public p?: number;

  constructor(private router: Router, private management: ManagementService) {}

  ngOnInit(): void {
    this.uploadAllergens();
  }

  uploadAllergens() {
    this.management.getAllAllergens().subscribe(
      (data) => {
        data.forEach((allergenJson: any) => {
          let allergenDTO: Allergen = {
            idAllergen: allergenJson.id,
            name: allergenJson.name,
          };
          this.allergens?.push(allergenDTO);
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  delete(id: number) {
    this.management.deleteAllergen(id).subscribe(
      (response) => {
        this.management.getAllAllergens().subscribe((data) => {
          this.allergens = [];
          data.forEach((element: { id: any; name: string }) => {
            let allergenDTO: Allergen = {
              idAllergen: element.id,
              name: element.name,
            };
            this.allergens?.push(allergenDTO);
          });
        });
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

  return() {
    this.router.navigateByUrl('/welcome');
  }

  updateAllergenUpdated(idAllergen: number) {
    if (idAllergen > 0) {
      let allergenFound: Allergen = this.allergens.filter(
        (allergen) => allergen.idAllergen == idAllergen
      )[0];
      this.management.getAllergenById(idAllergen).subscribe((response) => {
        allergenFound.name = response.name;
      });
    }
  }
}
