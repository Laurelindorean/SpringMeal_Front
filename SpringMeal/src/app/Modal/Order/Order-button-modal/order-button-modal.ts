import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { OrderEditDialog } from '../Order-edit-dialog/order-edit-dialog';

@Component({
  selector: 'app-order-button-modal',
  templateUrl: '../Order-button-modal/order-button-modal.html',
  styleUrls: ['../Order-button-modal/order-button-modal.css'],
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatIconModule]
})

export class OrderButtonModal {
  constructor(public dialog:MatDialog){
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(OrderEditDialog, {
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
