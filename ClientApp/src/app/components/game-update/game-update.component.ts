import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { GenreDetails, GameCreate, GameUpdate } from '../../models/game.model';
import { GameService } from '../../services/game.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game-update',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: '../game-create/game-create.component.html',
  styleUrl: '../game-create/game-create.component.css',
})
export class GameUpdateComponent implements OnInit {
  gameForm!: FormGroup;
  genres: GenreDetails[] = [];
  gameId!: number;
  formTitle = 'Edit Game';

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
      price: [
        '',
        [Validators.required, Validators.min(0), Validators.max(500)],
      ],
      releaseDate: ['', Validators.required],
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
    this.gameService.getGame(this.gameId).subscribe((game: GameUpdate) => {
      this.gameForm.patchValue({
        name: game.name,
        genreId: game.genreId,
        price: game.price,
        releaseDate: game.releaseDate,
      });
    });
  }

  submit(): void {
    if (this.gameForm.valid) {
      const game: GameCreate = {
        name: this.gameForm.value.name.trim(),
        genreId: Number.parseInt(this.gameForm.value.genreId),
        price: parseFloat(this.gameForm.value.price),
        releaseDate: this.gameForm.value.releaseDate,
      };

      this.gameService.updateGame(game, this.gameId).subscribe(() => {
        alert('Game Updated successfully');
        this.gameForm.reset();
      });
    }
  }
}
