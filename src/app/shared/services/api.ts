import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article } from '../interfaces';
import { API } from '../consts';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Api {
  http = inject(HttpClient);

  getAllArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(API + '/articles');
  }

  getArticle(id: string): Observable<Article> {
    return this.http.get<Article>(API + '/article/' + id);
  }

  addNewArticle(formData: FormData) {
    return this.http.post(API + '/article', formData);
  }

  editArticle(formData: FormData) {
    return this.http.put(API + '/article', formData);
  }

  deleteArticle(id: string) {
    return this.http.delete(API + '/article/' + id);
  }

}
