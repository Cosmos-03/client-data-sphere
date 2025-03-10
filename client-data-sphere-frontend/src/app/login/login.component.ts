import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthenticationService, AuthResponse } from '../services/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, 
    MatCardModule, 
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthenticationService, private router: Router) {}

  onLogin(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (response: AuthResponse) => {
        if (response.token) {
          // Store the JWT token (consider more secure options in production)
          localStorage.setItem('token', response.token);
          // Redirect to the dashboard
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = 'Invalid server response.';
        }
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Login failed. Please check your credentials.';
      }
    });
  }
}
