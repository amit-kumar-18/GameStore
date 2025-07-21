import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  GameCreate,
  GameDetails,
  GameUpdate,
  GenreDetails,
} from '../models/game.model';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private baseUrl = '/games';
  private genreUrl = '/genres';

  constructor(private http: HttpClient) {}

  // GET /games
  getGames(): Observable<GameDetails[]> {
    return this.http.get<GameDetails[]>(this.baseUrl);
  }

  // GET /games/#id
  getGame(id: number): Observable<GameDetails> {
    return this.http.get<GameDetails>(`${this.baseUrl}/${id}`);
  }

  // POST /game
  addGame(game: GameCreate): Observable<GameCreate> {
    return this.http.post<GameCreate>(this.baseUrl, game);
  }

  // PUT /game/#id
  updateGame(game: GameUpdate, id: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}\${id}`, game);
  }

  // DELETE /game/#id
  deleteGame(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // GET /genres
  getGenres(): Observable<GenreDetails[]> {
    return this.http.get<GenreDetails[]>(this.genreUrl);
  }
}
