import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from 'src/app/core';
import { KeyboardComponent } from './keyboard.component';

describe('KeyboardComponent', () => {
  let component: KeyboardComponent;
  let fixture: ComponentFixture<KeyboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [KeyboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
