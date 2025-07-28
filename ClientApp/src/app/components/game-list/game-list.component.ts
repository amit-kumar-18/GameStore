import { Component, OnInit } from '@angular/core';
import { GameDetails, GenreDetails } from '../../models/game.model';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UtcToIstPipe } from '../../utc-to-ist.pipe';

@Component({
  standalone: true,
  selector: 'app-game-list',
  imports: [CommonModule, FormsModule, RouterModule, UtcToIstPipe],
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.css',
})
export class GameListComponent implements OnInit {
  games: GameDetails[] = [];
  genres: GenreDetails[] = [];
  filteredGames: GameDetails[] = [];
  searchTerm: string = '';
  selectedGenre: string = '';
  maxPrice: number | null = null;

  constructor(private gameService: GameService, private router: Router) {}

  ngOnInit(): void {
    this.loadGames();
    this.loadGenres();
  }

  loadGames(): void {
    this.gameService.getGames().subscribe((data) => {
      this.games = data;
      this.applyFilters();
    });
  }

  loadGenres(): void {
    this.gameService.getGenres().subscribe((data) => (this.genres = data));
  }

  editGame(id: number): void {
    this.router.navigate(['/update-game', id]);
  }

  deleteGame(id: number): void {
    this.gameService.deleteGame(id).subscribe(() => {
      alert('Game Deleted Successfully');
      this.loadGames();
    });
  }

  applyFilters(): void {
    this.filteredGames = this.games.filter((game) => {
      const matchesSearch = game.name
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase());
      const matchesGenre = this.selectedGenre
        ? game.genre === this.selectedGenre
        : true;
      const matchesPrice =
        this.maxPrice !== null ? game.price <= this.maxPrice : true;
      return matchesSearch && matchesGenre && matchesPrice;
    });
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.selectedGenre = '';
    this.maxPrice = null;
    this.applyFilters();
  }
}
