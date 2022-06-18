import { TestBed } from '@angular/core/testing';
import { AppRoutingModule } from 'src/app/core';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppRoutingModule, HttpClientModule],
    });
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
