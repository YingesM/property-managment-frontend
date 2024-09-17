import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  templateUrl: './delete-dialog.component.html',
  imports: [NgIf, MatDialogModule, MatButtonModule]
})
export class DeleteDialogComponent {
  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>) {}

  onConfirm(): void {
    this.dialogRef.close(true); // User confirms deletion
  }

  onCancel(): void {
    this.dialogRef.close(false); // User cancels
  }
}
