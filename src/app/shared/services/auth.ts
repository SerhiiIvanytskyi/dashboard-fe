import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../consts';
import { UserRegisterRequest } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly TOKEN_KEY = 'auth_token';

  http = inject(HttpClient);

  register(creds: UserRegisterRequest) {
    return this.http.post<void>(API + '/auth/register', creds);
  }

  login(creds: UserRegisterRequest) {
    return this.http.post<{ token: string }>(API + '/auth/login', creds);
  }

  saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
