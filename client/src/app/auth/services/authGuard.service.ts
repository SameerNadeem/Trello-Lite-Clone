import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isLogged$.pipe(
      map((isLoggedIn) => {
        if (isLoggedIn) {
          return true;
        }

        this.router.navigateByUrl('/');
        return false;
      })
    );
  }
}
