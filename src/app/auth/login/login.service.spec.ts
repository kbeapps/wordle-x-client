import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './login.service';
import { LandingRoutingModule } from 'src/app/landing/landing-routing.module';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LandingRoutingModule, HttpClientModule],
    });
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
