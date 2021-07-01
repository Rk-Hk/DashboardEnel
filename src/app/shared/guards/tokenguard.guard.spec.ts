import { TestBed, async, inject } from '@angular/core/testing';

import { TokenguardGuard } from './tokenguard.guard';

describe('TokenguardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenguardGuard]
    });
  });

  it('should ...', inject([TokenguardGuard], (guard: TokenguardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
