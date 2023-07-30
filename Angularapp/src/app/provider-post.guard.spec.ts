import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { providerPostGuard } from './provider-post.guard';

describe('providerPostGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => providerPostGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
