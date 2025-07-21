import { Routes } from '@angular/router';
import { GameListComponent } from './components/game-list/game-list.component';
import { GameCreateComponent } from './components/game-create/game-create.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: 'games', component: GameListComponent },
  { path: 'addGame', component: GameCreateComponent },
  // { path: '**', redirectTo: 'games' },
];
