import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { MatIconModule } from '@angular/material/icon';
import { User } from 'src/app/Model/User';

@Component({
  selector: 'app-button-modal',
  templateUrl: './button-modal.component.html',
  styleUrls: ['./button-modal.component.css'],
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatIconModule],
})
export class ButtonModalComponent {
  @Input() user!: User;
  @Output() userUpdated: EventEmitter<number> = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '50%',
      autoFocus: true,
      maxWidth: '90vh',
      maxHeight: '90vh',
      hasBackdrop: true, // background shadow
      enterAnimationDuration,
      exitAnimationDuration,
      data: this.user,
    });
    dialogRef.afterClosed().subscribe((idUser) => {
      this.userUpdated.emit(idUser);
    });
  }
}
