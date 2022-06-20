import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from 'src/app/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup.component';
import { LandingRoutingModule } from 'src/app/landing/landing-routing.module';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LandingRoutingModule,
        HttpClientModule,
        MaterialModule,
        BrowserAnimationsModule,
      ],
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
