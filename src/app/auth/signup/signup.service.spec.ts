import { TestBed } from '@angular/core/testing';
import { AppRoutingModule } from 'src/app/core';
import { HttpClientModule } from '@angular/common/http';
import { SignupService } from './signup.service';

describe('SignupService', () => {
  let service: SignupService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppRoutingModule, HttpClientModule],
    });
    service = TestBed.inject(SignupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
