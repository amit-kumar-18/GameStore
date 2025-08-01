import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  standalone: true,
  selector: 'app-delete-confirm-dialog',
  templateUrl: './delete-confirm-dialog.component.html',
})
export class DeleteConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { gameName: string; onDelete: () => void }
  ) {}

  onConfirm(): void {
    this.data.onDelete();
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
