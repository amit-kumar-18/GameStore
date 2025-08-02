import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent,
  MatDialogModule,
} from '@angular/material/dialog';
import { GameDetails } from '../../../models/game.model';
import { UtcToIstPipe } from '../../../utc-to-ist.pipe';

@Component({
  standalone: true,
  selector: 'app-game-details-dialog',
  imports: [UtcToIstPipe, MatDialogModule],
  templateUrl: './game-details-dialog.component.html',
})
export class GameDetailsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<GameDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      game: GameDetails;
      onEdit: (id: number) => void;
      onDelete: (id: number) => void;
    }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
