import { Component, OnInit } from '@angular/core';
import { GameDetails } from '../../models/game.model';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-list',
  imports: [CommonModule],
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.css',
})
export class GameListComponent implements OnInit {
  games: GameDetails[] = [];

  constructor(private gameService: GameService, private router: Router) {}

  ngOnInit(): void {
    this.loadGames();
  }

  loadGames(): void {
    this.gameService.getGames().subscribe((data) => (this.games = data));
  }

  editGame(id: number): void {
    this.router.navigate(['/update-game', id]);
  }

  deleteGame(id: number): void {
    this.router.navigate(['/delete-game', id]);
  }
}
