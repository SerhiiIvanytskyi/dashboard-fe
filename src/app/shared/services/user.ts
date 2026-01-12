import { inject, Injectable, signal } from '@angular/core';
import { parseJwt } from '../utils';
import { Auth } from './auth';
import { HttpClient } from '@angular/common/http';
import { API } from '../consts';

@Injectable({
  providedIn: 'root',
})
export class User {
  user = signal<any | null>(null);

  private auth = inject(Auth);
  private http = inject(HttpClient);

  getUserData() {
    console.log('getUserData');
    const token = this.auth.getToken();
    this.user.set(parseJwt(token));
    console.log(token);
    return this.user();
  }

  setUserData() {
    const token = this.auth.getToken();
    if (token) {
      this.user.set(parseJwt(token));
    }
  }

  updateUserData(data: { name: string; age: string }) {
    return this.http.put(API + '/user', data);
  }
}
