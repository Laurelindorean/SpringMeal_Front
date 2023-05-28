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
  @Input() allergens : Record<number,any[]> = {}
  @Input() actions: any;
  @Output() deleteMe : EventEmitter<any> = new EventEmitter;


  constructor(public utils : UtilsService, private management : ManagementService, public dialog: MatDialog)  {}

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
        Swal.fire('Removed!', 'Product removed successfully.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Product still in our database.)', 'error');
      }
    });
  }

  
  delete() {
    this.management.deleteDish(this.dish.id).subscribe(
      (response) => {
        this.deleteMe.emit();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
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
      //his.allergenUpdated.emit(idAllergen);
    });
  }
}
