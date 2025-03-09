import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

export interface User {
  username: string;
  password: string;
  token?: string;
}


@Injectable({
  providedIn: 'root'
})


export class AuthenticationService {
  // Simulated users
  private users: User[] = [
    { username: 'user1', password: 'password1', token: 'token1' },
    { username: 'user2', password: 'password2', token: 'token2' },
    { username: 'user3', password: 'password3', token: 'token3' },
    // Add more users as needed
  ];

  constructor() { }

  login(username: string, password: string): Observable<User> {
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {
      // While setting up backend, we'll store the token in localStorage
      return of(user);
    } else {
      return throwError(() => new Error('Invalid username or password'));
    }
  }

  logout(): void {
    // Clear any stored tokens or user data
  }
}
