import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { API, DEFAULT_BACKGROUND } from '../../shared/consts';
import { ActivatedRoute } from '@angular/router';
import { Api } from '../../shared/services/api';
import { Article as ArticleModel } from '../../shared/interfaces';

@Component({
  selector: 'app-article',
  imports: [],
  templateUrl: './article.html',
  styleUrl: './article.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Article implements OnInit {
  protected readonly DEFAULT_BACKGROUND = DEFAULT_BACKGROUND;
  protected readonly API = API;

  article = signal<ArticleModel | null>(null);

  private route = inject(ActivatedRoute);
  private apiService = inject(Api);

  ngOnInit(): void {
    this.getArticle();
  }

  getArticle(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.apiService.getArticle(id).subscribe((article) => {
        this.article.set(article);
      });
    }
  }
}
