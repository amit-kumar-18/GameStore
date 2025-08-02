import { Component, OnInit } from '@angular/core';
import { GameDetails, GenreDetails } from '../../models/game.model';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameDetailsDialogComponent } from '../dialogs/game-details-dialog/game-details-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmDialogComponent } from '../dialogs/delete-confirm-dialog/delete-confirm-dialog.component';
import { SuccessDialogComponent } from '../dialogs/success-dialog/success-dialog.component';

@Component({
  standalone: true,
  selector: 'app-game-list',
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './game-list.component.html',
})
export class GameListComponent implements OnInit {
  games: GameDetails[] = [];
  genres: GenreDetails[] = [];
  filteredGames: GameDetails[] = [];
  searchTerm: string = '';
  selectedGenre: string = '';
  maxPrice: number | null = null;
  showConfirmDialog = false;
  selectedGame: GameDetails | null = null;

  constructor(
    private gameService: GameService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadGames();
    this.loadGenres();
  }

  loadGames(): void {
    this.gameService.getGames().subscribe({
      next: (data) => {
        this.games = data.map((game: GameDetails) => ({
          ...game,
          imageUrl: game.imageUrl?.trim() ? game.imageUrl : './not-found.png',
        }));
        this.applyFilters();
      },
      error: (err) => {
        console.error('Error loading games:', err);
      },
    });
  }

  loadGenres(): void {
    this.gameService.getGenres().subscribe((data) => (this.genres = data));
  }

  editGame(id: number) {
    this.router.navigate(['/update-game', id]);
  }

  showGameDetails(game: GameDetails) {
    this.dialog.open(GameDetailsDialogComponent, {
      data: {
        game: game,
        onEdit: (id: number) => this.editGame(id),
        onDelete: (id: number) => this.confirmDelete(id),
      },
      width: '90vw',
      maxWidth: 'fit-content',
      autoFocus: false,
    });
  }

  confirmDelete(id: number) {
    const gameToDelete = this.filteredGames.find((g) => g.id === id);
    if (gameToDelete) {
      this.dialog.open(DeleteConfirmDialogComponent, {
        data: {
          gameName: gameToDelete.name,
          onDelete: () => this.deleteGame(id),
        },
        panelClass: 'custom-dialog-container',
        width: '350px',
      });
    }
  }

  deleteGame(id: number) {
    this.gameService.deleteGame(id).subscribe(() => {
      this.games = this.games.filter((g) => g.id !== this.selectedGame?.id);
      this.filteredGames = [...this.games];
      this.selectedGame = null;
      this.dialog.open(SuccessDialogComponent, {
        data: {
          title: 'Success!',
          message: 'The game has been successfully deleted.',
        },
        panelClass: 'custom-dialog-container',
      });
      this.loadGames();
    });
  }

  filtersActive(): boolean {
    return !!(this.searchTerm || this.selectedGenre || this.maxPrice !== null);
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
