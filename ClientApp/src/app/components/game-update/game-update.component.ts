import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { GenreDetails, GameDetail } from '../../models/game.model';
import { GameService } from '../../services/game.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-game-update',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: '../game-create/game-create.component.html',
})
export class GameUpdateComponent implements OnInit {
  gameForm!: FormGroup;
  genres: GenreDetails[] = [];
  gameId!: number;
  formTitle = 'Edit Game';
  selectedImageFile!: File | null;
  selectedImagePreview!: string | null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private gameService: GameService
  ) {}

  ngOnInit(): void {
    this.gameId = Number(this.route.snapshot.paramMap.get('id'));

    this.gameForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      genreId: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      releaseDate: ['', Validators.required],
      image: [null],
      publisher: [''],
      description: [''],
    });

    this.loadGenres();
    this.loadGameDetails();
  }

  loadGenres(): void {
    this.gameService.getGenres().subscribe((data) => (this.genres = data));
  }

  showGames(): void {
    this.router.navigate(['/games']);
  }

  loadGameDetails(): void {
    this.gameService.getGame(this.gameId).subscribe((game: GameDetail) => {
      this.gameForm.patchValue({
        name: game.name,
        genreId: game.genreId,
        price: game.price,
        releaseDate: game.releaseDate,
        description: game.description,
        publisher: game.publisher,
      });
      this.selectedImagePreview = game.imageUrl;
    });
  }

  // Triggered when a file is selected
  onImageSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
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
  }

  allowOnlyNumbers(event: KeyboardEvent) {
    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab'];
    if (!/^[0-9]$/.test(event.key) && !allowedKeys.includes(event.key)) {
      event.preventDefault();
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

      this.gameService.updateGame(formData, this.gameId).subscribe(() => {
        alert('Game Updated successfully');
        this.gameForm.reset();
        this.router.navigate(['/games']);
      });
    }
  }
}
