import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-property-dialog',
  standalone: true,
  templateUrl: './property-dialog.component.html',
  styleUrls: ['./property-dialog.component.scss'],
  imports: [CommonModule,MatFormFieldModule,
    MatInputModule,
    MatIconModule, MatButtonModule,
    MatDialogModule,
    FormsModule, ReactiveFormsModule],
})
export class PropertyDialogComponent {
  keyControl!: FormControl;
  valueControl!: FormControl;

  constructor(
    public dialogRef: MatDialogRef<PropertyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { isEdit: boolean; key: string; value: string }
  ) {
    this.keyControl = new FormControl(this.data.key || '', Validators.required);
    this.valueControl = new FormControl(this.data.value || '', Validators.required);
  }
  formInvalid(): boolean {
    return this.keyControl.invalid || this.valueControl.invalid;
  }
  save() {
    if (!this.formInvalid()) {
      
      this.dialogRef.close({
        key: this.keyControl.value,
        value: this.valueControl.value,
      });
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}

