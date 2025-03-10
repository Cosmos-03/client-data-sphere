import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AuthResponse {
  token: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // Assuming your backend is served from the same domain, otherwise update the URL accordingly.
  private loginUrl = '/api/auth/login';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.loginUrl, { username, password });
  }
}
