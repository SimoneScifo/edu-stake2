import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  private user: any = null;

  login(username: string, password: string): Observable<boolean> {
    // Simulate an API call

    if (username === 'admin' && password === 'admin') {
      return of({ username, token: 'dummy-token' }).pipe(
        delay(1000),
        tap(user => {
          this.user = user;
          this.isLoggedIn.next(true);
        }),
        map(() => true)
      );
    } else {
      return of(false);
    }
  }

  logout(): void {
    this.user = null;
    this.isLoggedIn.next(false);
  }

  isAuthenticated(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }

  getUser(): any {
    return this.user;
  }
}
