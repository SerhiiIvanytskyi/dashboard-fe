import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { Field, form, required } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { Auth } from '../../shared/services/auth';

@Component({
  selector: 'app-sing-up',
  imports: [MatFormField, MatLabel, MatError, MatInput, Field, RouterLink, MatButton, MatCheckbox],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUp {
  policyConfirm = false;
  testVal = '';

  singUpModel = signal({
    name: '',
    age: '',
    email: '',
    password: '',
    passwordConfirm: '',
    policyConfirm: false,
  });

  singUpForm = form(this.singUpModel, (schemaPath) => {
    required(schemaPath.email);
    required(schemaPath.password);
    required(schemaPath.passwordConfirm);
    required(schemaPath.policyConfirm);
  });

  private auth = inject(Auth);
  private router = inject(Router);

  singUp() {
    const creds = {
      email: this.singUpForm.email().value(),
      password: this.singUpForm.password().value(),
    };

    console.log(creds);
    this.auth.register(creds).subscribe(() => {
      console.log('registered successfully');
      this.router.navigate(['login']);
    });
  }
}
