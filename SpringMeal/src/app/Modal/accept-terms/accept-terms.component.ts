import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-accept-terms',
  templateUrl: './accept-terms.component.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
})
export class AcceptTermsComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(AcceptTermsDialog);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}


@Component({
  selector: 'accept-terms-dialog',
  templateUrl: 'accept-terms-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class AcceptTermsDialog {}
