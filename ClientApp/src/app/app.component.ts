import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    MatTooltipModule,
    FormsModule,
    NgClass,
    MatDialogModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'GameStore';
  isMenuOpen = false;
  currentYear: number = new Date().getFullYear();

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
