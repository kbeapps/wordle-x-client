import { TestBed } from '@angular/core/testing';
import { AppRoutingModule } from '../modules';
import { HttpClientModule } from '@angular/common/http';

import { DashboardGuard } from './dashboard.guard';

describe('DashboardGuard', () => {
  let guard: DashboardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppRoutingModule, HttpClientModule],
    });
    guard = TestBed.inject(DashboardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
