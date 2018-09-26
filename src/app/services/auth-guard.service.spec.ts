import { TestBed } from '@angular/core/testing';

import { AuthGuardService } from './auth-guard.service';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';

describe('AuthGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({
      imports: [ RouterTestingModule, RouterModule ],
      providers: [ AuthGuardService ]
  }));

  it('should be created', () => {
    const service: AuthGuardService = TestBed.get(AuthGuardService);
    expect(service).toBeTruthy();
  });
});
