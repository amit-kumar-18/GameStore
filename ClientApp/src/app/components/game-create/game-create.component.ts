import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { GameCreate, GenreDetails } from '../../models/game.model';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-create',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './game-create.component.html',
  styleUrl: './game-create.component.css',
})
export class GameCreateComponent implements OnInit {
  gameForm!: FormGroup;
  genres: GenreDetails[] = [];

  constructor(private fb: FormBuilder, private gameService: GameService) {}

  ngOnInit(): void {
    this.gameForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      genreId: ['', Validators.required],
      price: [
        '',
        [Validators.required, Validators.min(0), Validators.max(500)],
      ],
      releaseDate: ['', Validators.required],
    });
    this.loadGenres();
  }

  loadGenres(): void {
    this.gameService.getGenres().subscribe((data) => (this.genres = data));
  }

  submit(): void {
    if (this.gameForm.valid) {
      const game: GameCreate = {
        name: this.gameForm.value.name.trim(),
        genreId: Number.parseInt(this.gameForm.value.genreId),
        price: parseFloat(this.gameForm.value.price),
        releaseDate: this.gameForm.value.releaseDate,
      };

      this.gameService.addGame(game).subscribe(() => {
        alert('Game added successfully');
        this.gameForm.reset();
      });
    }
  }
}
