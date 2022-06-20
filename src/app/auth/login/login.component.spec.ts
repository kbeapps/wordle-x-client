import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login.component';
import { RequestButtonComponent } from 'src/app/shared/components/request-button/request-button.component';
import { LandingRoutingModule } from 'src/app/landing/landing-routing.module';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingRoutingModule, HttpClientModule],
      declarations: [LoginComponent, RequestButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
