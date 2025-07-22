import { Routes } from '@angular/router';
import { GameListComponent } from './components/game-list/game-list.component';
import { GameCreateComponent } from './components/game-create/game-create.component';
import { GameUpdateComponent } from './components/game-update/game-update.component';

export const routes: Routes = [
  { path: 'games', component: GameListComponent },
  { path: 'addGame', component: GameCreateComponent },
  { path: 'update-game/:id', component: GameUpdateComponent },
  // { path: '**', redirectTo: 'games' },
];
