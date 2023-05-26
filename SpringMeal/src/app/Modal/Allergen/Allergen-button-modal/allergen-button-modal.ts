import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AllergenEditDialog } from '../Allergen-edit-dialog/allergen-edit-dialog';

@Component({
  selector: 'app-allergen-button-modal',
  templateUrl: '../Allergen-button-modal/allergen-button-modal.html',
  styleUrls: ['../Allergen-button-modal/allergen-button-modal.css'],
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatIconModule]
})

export class AllergenButtonModal{

  constructor(public dialog:MatDialog){
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AllergenEditDialog, {
      width: '50%',
      autoFocus: true,
      maxWidth: '90vh',
      maxHeight: '90vh',
      hasBackdrop: true, // background shadow
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

}
