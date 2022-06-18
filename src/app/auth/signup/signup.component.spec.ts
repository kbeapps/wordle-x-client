import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppRoutingModule } from 'src/app/core';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppRoutingModule, HttpClientModule],
      declarations: [SignupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
