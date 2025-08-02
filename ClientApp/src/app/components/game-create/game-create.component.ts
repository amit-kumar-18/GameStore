import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { GenreDetails } from '../../models/game.model';
import { GameService } from '../../services/game.service';
import { Router } from '@angular/router';
import { SuccessDialogComponent } from '../dialogs/success-dialog/success-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  standalone: true,
  selector: 'app-game-create',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './game-create.component.html',
})
export class GameCreateComponent implements OnInit {
  gameForm!: FormGroup;
  genres: GenreDetails[] = [];
  formTitle = 'Add Game';
  selectedImageFile!: File | null;
  selectedImagePreview!: string | null;

  constructor(
    private fb: FormBuilder,
    private gameService: GameService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.gameForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      genreId: ['', Validators.required],
      price: [
        '',
        [Validators.required, Validators.min(0), Validators.max(500)],
      ],
      releaseDate: ['', Validators.required],
      image: [null],
      publisher: [''],
      description: [''],
    });

    this.loadGenres();
  }

  loadGenres(): void {
    this.gameService.getGenres().subscribe((data) => (this.genres = data));
  }

  // Triggered when a file is selected
  onImageSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedImageFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  submit(): void {
    if (this.gameForm.valid) {
      const formData = new FormData();
      formData.append('name', this.gameForm.value.name.trim());
      formData.append('genreId', this.gameForm.value.genreId);
      formData.append('price', this.gameForm.value.price);
      formData.append('releaseDate', this.gameForm.value.releaseDate);
      if (this.selectedImageFile !== null) {
        formData.append('image', this.selectedImageFile);
      }
      formData.append('description', this.gameForm.value.description);
      formData.append('publisher', this.gameForm.value.publisher);

      this.gameService.addGame(formData).subscribe(() => {
        this.dialog.open(SuccessDialogComponent, {
          data: {
            title: 'Success!',
            message: 'Your game has been added successfully.',
          },
          panelClass: 'custom-dialog-container',
        });
        this.gameForm.reset();
        this.router.navigate(['/games']);
      });
    }
  }

  showGames(): void {
    this.router.navigate(['/games']);
  }

  allowOnlyNumbers(event: KeyboardEvent) {
    const allowedKeys = [
      'Backspace',
      'ArrowLeft',
      'ArrowRight',
      'Tab',
      'Delete',
    ];
    const input = event.target as HTMLInputElement;

    if (
      (!/^[0-9]$/.test(event.key) &&
        event.key !== '.' &&
        !allowedKeys.includes(event.key)) ||
      (event.key === '.' && input.value.includes('.'))
    ) {
      event.preventDefault();
    }
  }
}
