import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameDetails } from '../models/game.model';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private baseUrl = '/games';
  private genreUrl = '/genres';

  constructor(private http: HttpClient) {}

  getGames(): Observable<GameDetails[]> {
    return this.http.get<GameDetails[]>(this.baseUrl);
  }
}
