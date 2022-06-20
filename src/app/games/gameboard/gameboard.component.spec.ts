import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GamesModule } from '../games.module';
import { GameboardComponent } from './gameboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('GameboardComponent', () => {
  let component: GameboardComponent;
  let fixture: ComponentFixture<GameboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamesModule, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(GameboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
