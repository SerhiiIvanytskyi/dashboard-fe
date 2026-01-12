import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { Field, form, required } from '@angular/forms/signals';
import { Auth } from '../../shared/services/auth';
import { User } from '../../shared/services/user';

@Component({
  selector: 'app-login',
  imports: [MatFormField, MatLabel, MatError, MatInput, MatButton, RouterLink, Field],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  loginModel = signal({
    email: '',
    password: '',
  });

  loginForm = form(this.loginModel, (schemaPath) => {
    required(schemaPath.email);
    required(schemaPath.password);
  });

  private auth = inject(Auth);
  private user = inject(User);
  private router = inject(Router);

  login(): void {
    const creds = {
      email: this.loginForm.email().value(),
      password: this.loginForm.password().value(),
    };

    console.log(creds);

    this.auth.login(creds).subscribe((data) => {
      console.log(data);
      this.auth.saveToken(data.token);
      this.user.setUserData();

      this.router.navigate(['/']);
    });
  }
}
