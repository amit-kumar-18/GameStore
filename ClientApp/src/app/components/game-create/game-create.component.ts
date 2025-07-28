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

@Component({
  standalone: true,
  selector: 'app-game-create',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './game-create.component.html',
  styleUrl: './game-create.component.css',
})
export class GameCreateComponent implements OnInit {
  gameForm!: FormGroup;
  genres: GenreDetails[] = [];
  formTitle = 'Add Game';
  selectedImage!: File | string;

  constructor(
    private fb: FormBuilder,
    private gameService: GameService,
    private router: Router
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
    if (event.target.files && event.target.files.length > 0) {
      this.selectedImage = event.target.files[0];
    }
  }

  submit(): void {
    if (this.gameForm.valid) {
      const formData = new FormData();
      formData.append('name', this.gameForm.value.name.trim());
      formData.append('genreId', this.gameForm.value.genreId);
      formData.append('price', this.gameForm.value.price);
      formData.append('releaseDate', this.gameForm.value.releaseDate);
      formData.append('image', this.selectedImage);
      formData.append('description', this.gameForm.value.description);
      formData.append('publisher', this.gameForm.value.publisher);

      this.gameService.addGame(formData).subscribe(() => {
        alert('Game added successfully');
        this.gameForm.reset();
        this.router.navigate(['/games']);
      });
    }
  }

  showGames(): void {
    this.router.navigate(['/games']);
  }
}
