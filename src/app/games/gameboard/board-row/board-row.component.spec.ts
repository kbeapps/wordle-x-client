import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from 'src/app/core';
import { BoardRowComponent } from './board-row.component';

describe('BoardRowComponent', () => {
  let component: BoardRowComponent;
  let fixture: ComponentFixture<BoardRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [BoardRowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BoardRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
