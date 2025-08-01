import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDetailsDialogComponent } from './game-details-dialog.component';

describe('GameDetailsDialogComponent', () => {
  let component: GameDetailsDialogComponent;
  let fixture: ComponentFixture<GameDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameDetailsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
