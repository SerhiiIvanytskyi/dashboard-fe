import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatFabButton, MatMiniFabButton } from '@angular/material/button';
import { API, AVATAR, CATEGORIES, DEFAULT_BACKGROUND, SORT_OPTIONS } from '../../shared/consts';
import { RouterLink } from '@angular/router';
import { Api } from '../../shared/services/api';
import { MatCard, MatCardContent, MatCardFooter, MatCardHeader } from '@angular/material/card';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { Article } from '../../shared/interfaces';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatIcon,
    MatFabButton,
    RouterLink,
    MatCard,
    MatCardHeader,
    MatMenu,
    MatCardContent,
    MatCardFooter,
    MatButton,
    MatMenuItem,
    MatMiniFabButton,
    MatMenuTrigger,
    NgOptimizedImage,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard implements OnInit {
  protected readonly API = API;
  protected readonly CATEGORIES = CATEGORIES;
  protected readonly SORT_OPTIONS = SORT_OPTIONS;
  protected readonly DEFAULT_BACKGROUND = DEFAULT_BACKGROUND;
  protected readonly AVATAR = AVATAR;

  selectedCategory = 'All Categories';
  selectedSortOption = 'Ascending';

  search = false;

  articles: Article[] = [];

  apiService = inject(Api);
  cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.getAllArticles();
  }

  protected getAllArticles(): void {
    this.apiService.getAllArticles().subscribe((articles) => {
      this.articles = articles;
      console.log(articles);
      this.cdr.detectChanges();
    });
  }

  protected getArticles() {}

  protected getArticlesByCategory(option: any) {}

  protected sorting(option: any) {}

  protected deleteArticle(id: string) {
    this.apiService.deleteArticle(id).subscribe((res) => {
      this.getAllArticles();
      this.cdr.detectChanges();
    });
  }
}
