import { TestBed } from '@angular/core/testing';
import { AppRoutingModule } from '../modules';
import { LandingGuard } from './landing.guard';

describe('LandingGuard', () => {
  let guard: LandingGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppRoutingModule],
    });
    guard = TestBed.inject(LandingGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
