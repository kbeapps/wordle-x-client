import { TestBed } from '@angular/core/testing';
import { AppRoutingModule } from '../modules';
import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [AppRoutingModule],
      providers: [AuthInterceptor],
    })
  );

  it('should be created', () => {
    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
