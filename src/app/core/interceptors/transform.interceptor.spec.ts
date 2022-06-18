import { TestBed } from '@angular/core/testing';

import { TransformInterceptor } from './transform.interceptor';

describe('TransformInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [TransformInterceptor],
    })
  );

  it('should be created', () => {
    const interceptor: TransformInterceptor =
      TestBed.inject(TransformInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
