import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article } from '../interfaces';
import { API } from '../consts';

@Injectable({
  providedIn: 'root',
})
export class Api {
  http = inject(HttpClient);

  getAllArticles() {
    return this.http.get(API + '/articles');
  }

  addNewArticle(newArticle: Article) {
    return this.http.post(API + '/article', newArticle);
  }
}
