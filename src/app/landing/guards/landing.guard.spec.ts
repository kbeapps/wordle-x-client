import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LandingGuard } from './landing.guard';

describe('LandingGuard', () => {
  let guard: LandingGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    });
    guard = TestBed.inject(LandingGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
