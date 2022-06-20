import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppRoutingModule } from '../../core';
import { HttpClientModule } from '@angular/common/http';
import { FriendsComponent } from './friends.component';

describe('FriendsComponent', () => {
  let component: FriendsComponent;
  let fixture: ComponentFixture<FriendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppRoutingModule, HttpClientModule],
      declarations: [FriendsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
