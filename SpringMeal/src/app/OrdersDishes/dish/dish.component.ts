import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UtilsService } from '../../Service/utils.service';
import Swal from 'sweetalert2';
import { ManagementService } from 'src/app/Service/management.service';
import { MatDialog } from '@angular/material/dialog';
import { AllergenEditDialog } from 'src/app/Modal/Allergen/Allergen-edit-dialog/allergen-edit-dialog';
import { DishEditDialog } from 'src/app/Modal/dish-edit-dialog/dish-edit-dialog.component';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css']
})


export class DishComponent {

  @Input() dish: any;
  @Input() actions: any;
  @Output() deleteMe : EventEmitter<any> = new EventEmitter;
  @Input() allergens : any;


  constructor(public utils : UtilsService, private management : ManagementService, public dialog: MatDialog)  {
    //this.updateAllergens();
    console.log(this.allergens);
    
  }

  updateAllergens() {
    this.management.getDishAllergenByDish(this.dish.id).subscribe(
      (data) => {
        this.allergens = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    )

  }

  addToChart() {
    this.dish.chart = true;
    console.log(this.dish);
  }

  removeFromChart() {
    this.dish.chart = false;
    console.log(this.dish);
  }

  alertConfirmation() {
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
        this.delete();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Product still in our database.)', 'error');
      }
    });
  }

  
  delete() {
    this.management.deleteDish(this.dish.id).subscribe(
      (response) => {
        this.deleteMe.emit();
        Swal.fire('Removed!', 'Product removed successfully.', 'success');
      },
      (error) => {
        console.log(error);
        Swal.fire('Ooops!', 'Something went wrong.', 'error');
      }
    );
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    console.log(this.allergens);
    
    const dialogRef = this.dialog.open(DishEditDialog, {
      width: '50%',
      autoFocus: true,
      maxWidth: '90vh',
      maxHeight: '90vh',
      hasBackdrop: true, // background shadow
      enterAnimationDuration,
      exitAnimationDuration,
      data: this.dish,
    });
    dialogRef.afterClosed().subscribe((idAllergen) => {
      this.management.getDishAllergenByDish(this.dish.id).subscribe(
        (data) => {
          this.allergens = [];
          for (const dishallergen of data) {
            this.allergens.push(dishallergen.allergens.name);
          }
        },
        (error) => {console.log(error);
        }
      )
    });
  }
}
